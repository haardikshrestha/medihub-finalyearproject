import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaTint,
  FaBirthdayCake,
  FaTransgenderAlt,
  FaVenus,
  FaMars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface PatientData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateofbirth: string;
  chronicillness: string;
  address: string;
  bloodgroup: string;
  __v: number;
}

const PatientProfile: React.FC = () => {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedPatient, setEditedPatient] = useState<PatientData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`http://localhost:5173/patients/${email}`)
        .then((response) => {
          setPatient(response.data);
          setEditedPatient(response.data);
        })
        .catch((error) => {
          console.error("Error fetching patient details:", error);
        });
    } else {
      console.error("Email not found in localStorage");
    }
  }, []);

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "address" && value.trim() === "") {
      toast.error("Address cannot be empty.");
      return;
    }

    if (name === "chronicillness" && value.length > 30) {
      toast.error("Chronic illness description cannot exceed 30 characters.");
      return;
    }

    if (name === "dateofbirth") {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        toast.error("Patient must be at least 18 years old.");
        return;
      }
    }

    const updatedPatient = updatePatientData(editedPatient, name, value);
    setEditedPatient(updatedPatient);
  };

  const handleSaveProfile = () => {
    if (!editedPatient?.address || editedPatient?.address.trim() === "") {
      toast.error("Address cannot be empty.");
      return;
    }

    if (!editedPatient?.chronicillness || editedPatient?.chronicillness.trim() === "") {
      toast.error("Chronic illness description cannot be empty.");
      return;
    }

    if (editedPatient?.chronicillness && editedPatient?.chronicillness.length > 30) {
      toast.error("Chronic illness description cannot exceed 30 characters.");
      return;
    }

    const editedBirthDate = new Date(editedPatient?.dateofbirth || "");
    const currentDate = new Date();
    const age = currentDate.getFullYear() - editedBirthDate.getFullYear();

    if (age < 18) {
      toast.error("Patient must be at least 18 years old.");
      return;
    }

    const email = localStorage.getItem("email");
    if (email) {
      axios
        .put(`http://localhost:5173/patients/${email}`, editedPatient)
        .then((response) => {
          setPatient(response.data.patient);
          setEditMode(false);
          toast.success("Patient profile updated successfully");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            console.error("Error updating patient profile:", error);
            toast.error("An error occurred while updating the profile.");
          }
        });
    } else {
      console.error("Email not found in localStorage");
      toast.error("Email not found in localStorage.");
    }
  };

  const updatePatientData = (
    patient: PatientData | null,
    field: string,
    value: string,
  ): PatientData => {
    if (!patient) {
      throw new Error("Patient data is null");
    }

    return {
      ...patient,
      [field]: value,
    };
  };

  const renderGenderIcon = () => {
    if (patient?.gender === "male") {
      return <FaMars className="text-blue-400 mr-2" size={18} />;
    } else if (patient?.gender === "female") {
      return <FaVenus className=" text-pink-500 mr-2" size={18} />;
    } else {
      return <FaTransgenderAlt className="text-gray-500 mr-2" size={18} />;
    }
  };

  return (
    <div className="mx-auto bg-white rounded-lg overflow-hidden border">
      <div className="bg-gradient-to-r from-[#91BF77] to-[#75a559] py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="h-32 w-32 rounded-full object-cover mr-6 border-4 border-white"
            src="/src/assets/profile.png"
            alt={`${patient?.firstName} ${patient?.lastName}'s avatar`}
          />
          <div>
            <h2 className="text-3xl font-bold text-white">
              {patient?.firstName} {patient?.lastName}
            </h2>
            <p className="text-gray-200">Patient</p>
          </div>
        </div>
        <button
          className="bg-white text-[#91BF77] font-semibold py-2 px-4 rounded hover:bg-[#91BF77] hover:text-white transition duration-300 flex items-center"
          onClick={handleEditProfile}
        >
          <FaEdit className="mr-2" /> {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      <div className="py-4 px-8 border-t">
        <h3 className="text-2xl font-semibold mb-6 mt-2 text-center">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Email:</p>
            </div>
            <p className="text-gray-600">{patient?.email}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Address:</p>
            </div>
            {editMode ? (
              <input
                type="text"
                name="address"
                value={editedPatient?.address || ""}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">{patient?.address}</p>
            )}
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaHeartbeat className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Chronic Illness:</p>
            </div>
            {editMode ? (
              <input
                type="text"
                name="chronicillness"
                value={editedPatient?.chronicillness || ""}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">{patient?.chronicillness}</p>
            )}
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaTint className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Blood Group:</p>
            </div>
            {editMode ? (
              <select
                name="bloodgroup"
                value={editedPatient?.bloodgroup || ""}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p className="text-gray-600">{patient?.bloodgroup}</p>
            )}
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaBirthdayCake className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Date of Birth:</p>
            </div>
            {editMode ? (
              <input
                type="date"
                name="dateofbirth"
                value={editedPatient?.dateofbirth || ""}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">{patient?.dateofbirth}</p>
            )}
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaTransgenderAlt className="text-[#91BF77] mr-2" size={20} />
              <p className="text-gray-700 font-semibold">Gender:</p>
            </div>
            <div>{renderGenderIcon()}</div>
          </div>
        </div>
        {!editMode && (
          <Link to={"/resetask"}>
            <button
              className="bg-white border border-[#91BF77] rounded-xl text-[#91BF77] py-2 text-sm w-full hover:bg-[#91BF77] hover:text-white transition duration-300"
              type="submit"
            >
              Forgot Password?
            </button>
          </Link>
        )}
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

export default PatientProfile;
