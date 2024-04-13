import  { useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaTint,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PatientProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  patient: {
    name: string;
    avatar: string;
    bio: string;
    email: string;
    phone: string;
    address: string;
    medicalHistory: string;
    ill: string;
    blood: string;
    appointments: { date: string; doctor: string; reason: string }[];
  };
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient, ...rest }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handlechange = () => {
    navigate("/resetask")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPatient({ ...editedPatient, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setEditMode(false);
  };

  return (
    <div className=" mx-auto bg-white rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#91BF77] to-[#75a559] py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="h-24 w-24 rounded-full object-cover mr-6"
            src="src\\assets\\pfp.png"
            alt={`${patient.name}'s avatar`}
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{patient.name}</h2>
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
      <div className="py-4 px-8 border">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-[#91BF77] mr-2" size={18} />
              <p className="text-gray-700 font-semibold">Email:</p>
            </div>
            <div>
              
              <p className="text-gray-600">{patient.email}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <FaPhone className="text-[#91BF77] mr-2" size={18} />
              <p className="text-gray-700 font-semibold">Phone:</p>
            </div>
            {editMode ? (
              <input
                type="tel"
                name="phone"
                value={editedPatient.phone}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">{patient.phone}</p>
            )}
          </div>
          <div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-[#91BF77] mr-2" size={18} />
              <p className="text-gray-700 font-semibold">Address:</p>
            </div>
            {editMode ? (
              <input
                type="text"
                name="address"
                value={editedPatient.address}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">{patient.address}</p>
            )}
          </div>
          <div>
            <div className="flex items-center mb-2 mt-3">
              <FaHeartbeat className="text-[#91BF77] mr-2" size={18} />
              <p className="text-gray-700 font-semibold">Chronic Illness:</p>
            </div>
            {editMode ? (
              <input
                type="text"
                name="chronicIllness"
                value={editedPatient.ill}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">Diabetes</p>
            )}
          </div>
          <div>
            <div className="flex items-center mb-2 mt-3">
              <FaTint className="text-[#91BF77] mr-2" size={18} />
              <p className="text-gray-700 font-semibold">Blood Group:</p>
            </div>
            {editMode ? (
              <input
                type="text"
                name="bloodGroup"
                value={editedPatient.blood}
                onChange={handleInputChange}
                className="text-gray-600 border border-gray-300 rounded py-2 px-3 w-full"
              />
            ) : (
              <p className="text-gray-600">A+</p>
            )}
          </div>
          <div>
          {editMode && (
          <div className="flex justify-end">
            <button
              className="bg-[#91BF77] text-white  py-2 px-3 w-full mt-11 rounded hover:bg-[#75a559] transition duration-300"
              onClick={handlechange}
            >
              Change Password
            </button>
          </div>
        )}
          </div>
        </div>
        {editMode && (
          <div className="flex justify-center">
            <button
              className="bg-[#91BF77] text-white  py-2 px-4 w-[100px] rounded hover:bg-[#75a559] transition duration-300"
              onClick={handleSaveProfile}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="bg-gray-100 p-3 flex justify-center">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;
