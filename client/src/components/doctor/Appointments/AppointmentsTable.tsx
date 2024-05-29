import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaUserInjured,
  FaClock,
  FaClipboardCheck,
  FaChevronLeft,
  FaChevronRight,
  FaNotesMedical,
  FaFolder,
  FaFolderOpen,
} from "react-icons/fa";

interface Appointment {
  _id: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptStatus: string;
  apptDisease: string;
  paymentStatus: string;
  transactionID: string;
  apptPatientEmail: string;
}

interface Patient {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateofbirth: string;
  chronicillness: string;
  address: string;
  bloodgroup: string;
}

const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState("all");
  const [email, setEmail] = useState<string>("");
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5173/doctor/viewpatients?email=${email}`,
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };
    if (email) {
      fetchPatient();
    }
  }, [email]);

  const getAppointments = async () => {
    try {
      const doctorEmail = localStorage.getItem("email");
      if (!doctorEmail) {
        throw new Error("Doctor email not found in localStorage");
      }
      const response = await axios.get<Appointment[]>(
        "http://localhost:5173/getappointments",
      );
      const doctorAppointments = response.data.filter(
        (appointment) => appointment.apptDoctor === doctorEmail,
      );
      setAppointments(doctorAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const filteredAppointments = () => {
    if (activeTab === "all") {
      return appointments.filter((appointment) => appointment.apptStatus === "Scheduled");
      //}
      // else if (activeTab === "today") {
      //   return appointments.filter((appointment) => appointment.apptStatus === "Pending");
    } else if (activeTab === "completed") {
      return appointments.filter((appointment) => appointment.apptStatus === "completed");
    }
    return [];
  };

  const currentItems = filteredAppointments().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(filteredAppointments().length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`inline-block px-3 py-1 mx-1 rounded-full cursor-pointer transition-colors duration-300 ${
            i === currentPage
              ? "bg-[#91BF77] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </div>,
      );
    }

    return pageNumbers;
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNextPage = () => {
    setCurrentPage(
      currentPage < Math.ceil(filteredAppointments().length / itemsPerPage)
        ? currentPage + 1
        : currentPage,
    );
  };

  const handleAppointmentCompletion = async (appointmentId: string) => {
    try {
      await axios.put(`http://localhost:5173/updateappointment/${appointmentId}`, {
        status: "completed",
      });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, apptStatus: "completed" }
            : appointment,
        ),
      );
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  };

  return (
    <div className="bg-white rounded-b-lg rounded-tr-lg overflow-x-auto">
      <div className="relative bg-white rounded-lg overflow-hidden">
        <div className="flex border-gray-200">
          <div
            className={`p-4 flex items-center cursor-pointer border-tl rounded-tl-lg ${
              activeTab === "all"
                ? "bg-[#91BF77] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("all")}
          >
            {activeTab === "all" ? (
              <FaFolderOpen className="mr-2" />
            ) : (
              <FaFolder className="mr-2" />
            )}
            All
          </div>
          {/* <div
            className={`p-4 flex items-center cursor-pointer border-r ${
              activeTab === "today"
                ? "bg-[#91BF77] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("today")}
          >
            {activeTab === "today" ? (
              <FaFolderOpen className="mr-2" />
            ) : (
              <FaFolder className="mr-2" />
            )}
            Today
          </div> */}
          <div
            className={`p-4 flex items-center cursor-pointer rounded-tr-lg ${
              activeTab === "completed"
                ? "bg-[#91BF77] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            {activeTab === "completed" ? (
              <FaFolderOpen className="mr-2" />
            ) : (
              <FaFolder className="mr-2" />
            )}
            Completed
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#91BF77] to-[#75a559] px-6 py-4 text-white flex items-center justify-between">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <FaCalendarAlt size={24} />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <FaCalendarAlt className="inline-block mr-2" /> Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <FaClock className="inline-block mr-2" /> Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <FaUserInjured className="inline-block mr-2" /> Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <FaClipboardCheck className="inline-block mr-2" /> Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((appointment) => (
            <tr
              key={appointment._id}
              className="hover:bg-gray-100 transition duration-300"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(appointment.apptDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.apptTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {appointment.apptPatient}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  className={`px-3 py-1 rounded-full ${
                    appointment.apptStatus === "scheduled"
                      ? "bg-green-200 text-green-800"
                      : appointment.apptStatus === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : appointment.apptStatus === "Canceled"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {appointment.apptStatus}
                </span>
              </td>
              {!(appointment.apptStatus == "completed") && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center space-x-2">
                  <a
                    href={`http://localhost:3000/doctor/patients/view?email=${appointment.apptPatient}`}
                    className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors cursor-pointer"
                    onClick={() => handleAppointmentCompletion(appointment._id)}
                  >
                    <FaNotesMedical className="text-green-500 text-lg" />
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
        <div>
          <button
            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-200 transition duration-300"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft className="mr-2" />
            Previous
          </button>
        </div>
        <div className="flex space-x-1">{renderPageNumbers()}</div>
        <div>
          <button
            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-200 transition duration-300"
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredAppointments().length / itemsPerPage)
            }
          >
            Next
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;
