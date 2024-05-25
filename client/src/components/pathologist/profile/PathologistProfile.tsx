import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaEdit,
  FaUserMd,
  FaIdBadge,
  FaEnvelope,
  FaGraduationCap,
  FaUniversity,
  FaPhone,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PathologistData {
  _id: string;
  fullname: string;
  nmc: string;
  email: string;
  number: string;
  degree: string;
  school: string;
  __v: number;
}

const PathologistProfile: React.FC = () => {
  const [pathologist, setPathologist] = useState<PathologistData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedPathologist, setEditedPathologist] = useState<PathologistData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`http://localhost:5173/getpathologistbyemail/${email}`)
        .then((response) => {
          setPathologist(response.data);
          setEditedPathologist(response.data);
        })
        .catch((error) => {
          console.error("Error fetching pathologist details:", error);
        });
    } else {
      console.error("Email not found in localStorage");
    }
  }, []);

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "number" && !/^\d{0,10}$/.test(value)) {
      return; // Prevent invalid input
    }

    const updatedPathologist = updatePathologistData(editedPathologist, name, value);
    setEditedPathologist(updatedPathologist);
  };

  const handleSaveProfile = () => {
    const email = localStorage.getItem("email");
    if (email) {
      if (!/^\d{10}$/.test(editedPathologist?.number || "")) {
        toast.error("Phone number must be exactly 10 digits.");
        return;
      }

      axios
        .put(`http://localhost:5173/pathologists/${email}`, editedPathologist)
        .then((response) => {
          setPathologist(response.data.pathologist);
          setEditMode(false);
          toast.success("Pathologist profile updated successfully");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            console.error("Error updating pathologist profile:", error);
            toast.error("An error occurred while updating the profile.");
          }
        });
    } else {
      console.error("Email not found in localStorage");
      toast.error("Email not found in localStorage.");
    }
  };

  const updatePathologistData = (
    pathologist: PathologistData | null,
    field: string,
    value: string,
  ): PathologistData => {
    if (!pathologist) {
      throw new Error("Pathologist data is null");
    }

    return {
      ...pathologist,
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
            alt={`${pathologist?.fullname}'s avatar`}
          />
          <div>
            <h2 className="text-3xl font-bold text-white">{pathologist?.fullname}</h2>
            <p className="text-gray-200 flex items-center">
              <FaUserMd className="mr-2" /> Pathologist
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
            <p className="text-gray-600">{pathologist?.nmc}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Email:</p>
            </div>
            <p className="text-gray-600">{pathologist?.email}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaPhone className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Number:</p>
            </div>
            {editMode ? (
              <input
                type="text"
                name="number"
                value={editedPathologist?.number || ""}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">{pathologist?.number}</p>
            )}
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaGraduationCap className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Degree:</p>
            </div>
            <p className="text-gray-600">{pathologist?.degree}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaUniversity className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">School:</p>
            </div>
            <p className="text-gray-600">{pathologist?.school}</p>
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

export default PathologistProfile;
