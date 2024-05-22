import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateDoctor from "./CreateDoctor";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  fullname: string;
  email: string;
  nmc: string; // Added nmc field
  expertise: string;
}

const DoctorTable: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

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

  const handleView = (email: string) => {
    navigate(`/admin/vieweditdoctors?email=${email}`);
  };

  const handleEdit = (email: string) => {
    navigate(`/admin/vieweditdoctors?email=${email}`);
  };


  const handleDelete = async (email: string) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:5173/deletepatients/${email}`);
              setDoctors(doctors.filter((doctor) => doctor.email !== email));
            } catch (error) {
              console.error("Error deleting user:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            /* No action required */
          },
        },
      ],
    });
  };

  // const handleDeleteConfirm = async (doctorEmail: string) => {
  //   try {
  //     await axios.delete(`http://localhost:5173/deleteDoctor?email=${encodeURIComponent(doctorEmail)}`);
  
  //     await axios.delete(`http://localhost:5173/deleteUser?email=${encodeURIComponent(doctorEmail)}`);
      
  //     setDoctors(doctors.filter(doctor => doctor.email !== doctorEmail));
  //   } catch (error) {
  //     console.error('Error deleting doctor:', error);
  //   }
  // };

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
                <td className="px-6 py-4 whitespace-nowrap text-sm">{doctor.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{doctor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{doctor.expertise}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    onClick={() => handleView(doctor.email)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-600 hover:text-green-900 mr-2"
                    onClick={() => handleEdit(doctor.email)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(doctor.email)}
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
