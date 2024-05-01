import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaUserInjured, FaClock, FaUserMd, FaClipboardCheck, FaHeartbeat, FaChevronLeft, FaChevronRight, FaNotesMedical, FaTrashAlt } from "react-icons/fa";

interface Appointment {
  apptID: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptStatus: string;
  apptDisease: string;
  paymentStatus: string;
  transactionID: string;
}

const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getAppointments = async () => {
    try {
      const response = await axios.get<Appointment[]>("http://localhost:5173/getappointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(appointments.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`inline-block px-3 py-1 mx-1 rounded-full cursor-pointer transition-colors duration-300 ${
            i === currentPage ? "bg-[#91BF77] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </div>
      );
    }

    return pageNumbers;
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage < Math.ceil(appointments.length / itemsPerPage) ? currentPage + 1 : currentPage);
  };

  return (
    <div className="bg-white rounded-b-lg rounded-tr-lg overflow-x-auto">
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
              <FaHeartbeat className="inline-block mr-2" /> Disease
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((appointment) => (
            <tr key={appointment.apptID} className="hover:bg-gray-100 transition duration-300">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptTime}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptPatient}</td>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptDisease}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors cursor-pointer">
                  <FaNotesMedical className="text-green-500 text-lg" />
                </div>
                <div className="bg-red-100 p-2 rounded-full hover:bg-red-200 transition-colors cursor-pointer">
                  <FaTrashAlt className="text-red-500 text-lg" />
                </div>
              </td>
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
            disabled={currentPage === Math.ceil(appointments.length / itemsPerPage)}
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