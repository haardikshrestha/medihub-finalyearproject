import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaEdit,
  FaUserMd,
  FaIdBadge,
  FaEnvelope,
  FaBriefcaseMedical,
  FaGraduationCap,
  FaUniversity,
  FaClock,
  FaCalendarAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface DoctorData {
  _id: string;
  fullName: string;
  nmc: string;
  email: string;
  role: string;
  expertise: string;
  degree: string;
  school: string;
  startTime: string;
  endTime: string;
  daysAvailable: string[];
  fees: string;
  __v: number;
}

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<DoctorData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState<DoctorData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`http://localhost:5173/doctors/${email}`)
        .then((response) => {
          setDoctor(response.data);
          setEditedDoctor(response.data);
        })
        .catch((error) => {
          console.error("Error fetching doctor details:", error);
        });
    } else {
      console.error("Email not found in localStorage");
    }
  }, []);

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const updatedDoctor = updateDoctorData(editedDoctor, e.target.name, e.target.value);
    setEditedDoctor(updatedDoctor);
  };

  const handleSaveProfile = () => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .put(`http://localhost:5173/doctors/${email}`, editedDoctor)
        .then((response) => {
          setDoctor(response.data.doctor);
          setEditMode(false);
          toast.success("Doctor profile updated successfully"); // Show success toast
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message); // Show error message from the backend
          } else {
            console.error("Error updating doctor profile:", error);
            toast.error("An error occurred while updating the profile."); // Show generic error toast
          }
        });
    } else {
      console.error("Email not found in localStorage");
      toast.error("Email not found in localStorage."); // Show error toast
    }
  };

  const updateDoctorData = (
    doctor: DoctorData | null,
    field: string,
    value: string,
  ): DoctorData => {
    if (!doctor) {
      throw new Error("Doctor data is null");
    }

    return {
      ...doctor,
      [field]: value,
    };
  };

  return (
    <div className="mx-auto bg-white rounded-lg overflow-hidden border">
      <div className="bg-gradient-to-r from-[#91BF77] to-[#75a559] py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="h-32 w-32 rounded-full object-cover mr-6 border-4 border-white"
            src="/src/assets/profile.png"
            alt={`${doctor?.fullName}'s avatar`}
          />
          <div>
            <h2 className="text-3xl font-bold text-white">{doctor?.fullName}</h2>
            <p className="text-gray-200 flex items-center">
              <FaUserMd className="mr-2" /> Doctor
            </p>
          </div>
        </div>
        <button
          className="bg-white text-[#75a559] font-semibold py-2 px-4 rounded hover:bg-[#91BF77] hover:text-white transition duration-300 flex items-center shadow-md"
          onClick={handleEditProfile}
        >
          <FaEdit className="mr-2" /> {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      <div className="py-6 px-8 border-t">
        <h3 className="text-2xl font-semibold mb-6 mt-2 text-center">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaIdBadge className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">NMC:</p>
            </div>
            <p className="text-gray-600">{doctor?.nmc}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Email:</p>
            </div>
            <p className="text-gray-600">{doctor?.email}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaBriefcaseMedical className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Expertise:</p>
            </div>
            <p className="text-gray-600">{doctor?.expertise}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaClock className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Available Time:</p>
            </div>
            {editMode ? (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="startTime"
                  value={editedDoctor?.startTime || ""}
                  onChange={handleInputChange}
                  className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
                  placeholder="Start Time"
                />
                <span className="text-gray-600">-</span>
                <input
                  type="text"
                  name="endTime"
                  value={editedDoctor?.endTime || ""}
                  onChange={handleInputChange}
                  className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
                  placeholder="End Time"
                />
              </div>
            ) : (
              <p className="text-gray-600">
                {doctor?.startTime} - {doctor?.endTime}
              </p>
            )}
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Days Available:</p>
            </div>
            {editMode ? (
              <textarea
                name="daysAvailable"
                value={editedDoctor?.daysAvailable.join(", ") || ""}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">{doctor?.daysAvailable.join(", ")}</p>
            )}
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaMoneyBillAlt className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Fees:</p>
            </div>
            {editMode ? (
              <input
                type="text"
                name="fees"
                value={editedDoctor?.fees || ""}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">{doctor?.fees}</p>
            )}
          </div>
        </div>
        {editMode && (
          <div className="flex justify-center">
            <button
              className="bg-[#91BF77] text-white py-2 px-6 rounded-full hover:bg-[#75a559] transition duration-300 shadow-md"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
