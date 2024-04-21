import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateDoctor from "./CreateDoctor";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface Doctor {
  _id: string;
  fullName: string;
  email: string;
  number: string;
  expertise: string;
}

const DoctorTable: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>("http://localhost:5173/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDeleteClick = (doctorEmail: string) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this doctor?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteConfirm(doctorEmail),
        },
        {
          label: 'No',
          onClick: handleDeleteCancel,
        },
      ],
    });
  };

  const handleDeleteConfirm = async (doctorEmail: string) => {
    try {
      await axios.delete(`http://localhost:5173/deleteDoctor?email=${encodeURIComponent(doctorEmail)}`);
  
      await axios.delete(`http://localhost:5173/deleteUser?email=${encodeURIComponent(doctorEmail)}`);
      
      setDoctors(doctors.filter(doctor => doctor.email !== doctorEmail));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleDeleteCancel = () => {
    // Close the modal or handle cancel action
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Doctors:</span>
          <span className="font-bold">{doctors.length}</span>
        </div>
        <CreateDoctor />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{doctor.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{doctor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{doctor.expertise}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteClick(doctor.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorTable;
