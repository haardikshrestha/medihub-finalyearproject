import React, { useState } from "react";
import axios from "axios";

interface Appointment {
  apptID: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptDisease: string;
  paymentStatus: string;
  transactionID: string;
}

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState<Appointment>({
    apptID: "",
    apptDate: "",
    apptPatient: "",
    apptTime: "",
    apptDoctor: "",
    apptDisease: "",
    paymentStatus: "",
    transactionID: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/appointments", formData);
      console.log(response.data);
      // Handle success (redirect, show message, etc.)
    } catch (error) {
      console.error("Error saving appointment:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">New Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="apptID" className="block mb-1">
            Appointment ID:
          </label>
          <input
            type="text"
            id="apptID"
            name="apptID"
            value={formData.apptID}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apptDate" className="block mb-1">
            Appointment Date:
          </label>
          <input
            type="date"
            id="apptDate"
            name="apptDate"
            value={formData.apptDate}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apptPatient" className="block mb-1">
            Patient Name:
          </label>
          <input
            type="text"
            id="apptPatient"
            name="apptPatient"
            value={formData.apptPatient}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apptTime" className="block mb-1">
            Appointment Time:
          </label>
          <input
            type="text"
            id="apptTime"
            name="apptTime"
            value={formData.apptTime}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apptDoctor" className="block mb-1">
            Doctor Name:
          </label>
          <input
            type="text"
            id="apptDoctor"
            name="apptDoctor"
            value={formData.apptDoctor}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apptDisease" className="block mb-1">
            Disease:
          </label>
          <input
            type="text"
            id="apptDisease"
            name="apptDisease"
            value={formData.apptDisease}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="paymentStatus" className="block mb-1">
            Payment Status:
          </label>
          <input
            type="text"
            id="paymentStatus"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="transactionID" className="block mb-1">
            Transaction ID:
          </label>
          <input
            type="text"
            id="transactionID"
            name="transactionID"
            value={formData.transactionID}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
