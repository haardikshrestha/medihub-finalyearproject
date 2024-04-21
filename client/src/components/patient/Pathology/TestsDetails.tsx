import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface LabTest {
  _id: string;
  testFields: string[];
  testName: string;
  testPrice: string;
}

const TestDetails: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [patientEmail, setPatientEmail] = useState("");
  const [labTest, setLabTest] = useState<LabTest | null>(null);
  const [formData, setFormData] = useState({
    patientEmail: "",
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    testName: "",
    testID: "",
  });
  const [existingAppointments, setExistingAppointments] = useState<{
    [date: string]: string[];
  }>({});

  useEffect(() => {
    const fetchLabTest = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/singlelabtest?id=${id}`);
        setLabTest(response.data);
      } catch (error) {
        console.error("Error fetching lab test:", error);
      }
    };

    if (id) {
      fetchLabTest();
    }
  }, [id]);

  useEffect(() => {
    const fetchExistingAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5173/samplecollections/get/all",
        );
        const appointments = response.data;
        const groupedAppointments: { [date: string]: string[] } = {};

        appointments.forEach(
          (appointment: { appointmentDate: string; appointmentTime: string }) => {
            const { appointmentDate, appointmentTime } = appointment;
            if (!groupedAppointments[appointmentDate]) {
              groupedAppointments[appointmentDate] = [];
            }
            groupedAppointments[appointmentDate].push(appointmentTime);
          },
        );

        setExistingAppointments(groupedAppointments);
      } catch (error) {
        console.error("Error fetching existing appointments:", error);
      }
    };

    fetchExistingAppointments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  useEffect(() => {
    const fetchPatientEmail = async () => {
      const email = await localStorage.getItem("email");
      if (email) {
        setPatientEmail(email);
      } else {
        console.error("Email not found in localStorage");
      }
    };

    fetchPatientEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { appointmentDate, appointmentTime} = formData;
  
    if (!appointmentDate || !appointmentTime ) {
      toast.error('Please fill all required details.');
      return;
    }
  
    try {
      if (labTest) {
        const takenTimes = existingAppointments[appointmentDate] || [];
  
        if (takenTimes.includes(appointmentTime)) {
          toast.error('Selected time is already taken. Please choose a different time.');
        } else {
          confirmAlert({
            title: 'Confirm Appointment',
            message: `Are you sure you want to schedule the ${labTest.testName} test on ${appointmentDate} at ${appointmentTime}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: async () => {
                  try {
                    const updatedFormData = { ...formData, testName: labTest.testName, testID: labTest._id, patientEmail };
                    await axios.post('http://localhost:5173/scheduleSample', updatedFormData);
                    setFormData({ ...formData, appointmentDate: '', appointmentTime: '' });
                    toast.success('You have scheduled an appointment successfully!');
                  } catch (error) {
                    handleError(error);
                  }
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
        }
      } else {
        throw new Error('Lab test data is missing.');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    if (error.response && error.response.data) {
      const { data } = error.response;

      if (data.error) {
        toast.error(data.error);
      } else if (data.errors) {
        const errors = data.errors;
        errors.forEach((err: { msg: string }) => toast.error(err.msg));
      } else {
        console.error("Error:", error);
      }
    } else {
      console.error("Error:", error);
    }
  };

  const getTakenTimes = (date: string) => {
    return existingAppointments[date] || [];
  };

  const generateTimeOptions = (date: string) => {
    const takenTimes = getTakenTimes(date);
    const options = [];

    for (let hour = 9; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        if (!takenTimes.includes(time)) {
          options.push(
            <option key={time} value={time}>
              {time}
            </option>,
          );
        }
      }
    }

    return options;
  };

  const handleESewaPayment = () => {
    console.log("Initiating eSewa payment for Rs. ", labTest?.testPrice);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-14">
      <div className="bg-white rounded-lg border p-8 max-w-md mb-8 md:mb-0 md:mr-8">
        {labTest ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Lab Test Details</h2>
            <p className="text-gray-700 mb-2 text-sm">
              <span className="font-semibold">Name:</span> {labTest.testName}
            </p>
            <p className="text-gray-700 mb-2 text-sm">
              <span className="font-semibold">Price:</span> Rs. {labTest.testPrice}
            </p>
          </div>
        ) : (
          <p className="text-gray-700 text-center">Loading...</p>
        )}
      </div>

      {labTest && (
        <div className="bg-white rounded-lg border p-8 max-w-md">
          <h2 className="text-xl font-bold mb-4">Schedule Test Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              placeholder="Appointment Date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Time</option>
              {formData.appointmentDate && generateTimeOptions(formData.appointmentDate)}
            </select>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#91BF77] text-white rounded-md hover:bg-[#7da466]  transition-colors duration-300"
            >
              Schedule
            </button>
          </form>
          
          <button
              onClick={handleESewaPayment}
              className="w-full px-4 py-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Pay with eSewa (Rs. {labTest.testPrice})
            </button>
        </div>
      )}
      
    </div>
  );
};

export default TestDetails;
