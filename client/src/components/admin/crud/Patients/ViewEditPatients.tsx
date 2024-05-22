import React, { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

interface Patient {
    patientId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateofbirth: string;
  chronicillness: string;
  address: string;
  bloodgroup: string;
}

const ViewEditPatients: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editIconClicked, setEditIconClicked] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get<Patient>(
          `http://localhost:5173/doctor/viewpatients?email=${email}`,
        );
        setPatient(response.data);
        setEditedPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };
    if (email) {
      fetchPatient();
    }
  }, [email]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPatient((prevPatient) => ({
      ...prevPatient!,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      if (!editedPatient) return;
      await axios.put(
        `http://localhost:5173/updatepatients/${email}`,
        editedPatient,
      );
      setPatient(editedPatient);
      setEditMode(false);
      setEditIconClicked(false);
      toast.success("Patient updates sucessfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-[#7da466] transition-colors duration-200"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold text-black">Patient Information</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg border border-[#b3db9c] p-8">
        <div>
          <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-[#91BF77] pb-2">
            Personal Information
          </h3>
          <div className="space-y-4 mt-4">
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                ID
              </span>
              <p className="text-black">{patient?.patientId}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Email
              </span>
              <p className="text-black">{patient?.email}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Name
              </span>
              {editMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={editedPatient?.firstName || ""}
                  onChange={handleInputChange}
                  className="text-black border rounded-md px-2 py-1"
                />
              ) : (
                <p>{`${patient?.firstName || ""} ${patient?.lastName || ""}`}</p>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Address
              </span>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={editedPatient?.address || ""}
                  onChange={handleInputChange}
                  className="text-black border rounded-md px-2 py-1"
                />
              ) : (
                <p>{patient?.address}</p>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Date of Birth
              </span>
              {editMode ? (
                <input
                  type="text"
                  name="dateofbirth"
                  value={editedPatient?.dateofbirth || ""}
                  onChange={handleInputChange}
                  className="text-black border rounded-md px-2 py-1"
                />
              ) : (
                <p>{patient?.dateofbirth}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-[#91BF77] pb-2">
            Medical Information
          </h3>
          <div className="space-y-4 mt-4">
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Chronic Illness
              </span>
              {editMode ? (
                <input
                  type="text"
                  name="chronicillness"
                  value={editedPatient?.chronicillness || ""}
                  onChange={handleInputChange}
                  className="text-black border rounded-md px-2 py-1"
                />
              ) : (
                <p>{patient?.chronicillness}</p>
              )}
            </div>

            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Blood Group
              </span>
              {editMode ? (
                <input
                  type="text"
                  name="bloodgroup"
                  value={editedPatient?.bloodgroup || ""}
                  onChange={handleInputChange}
                  className="text-black border rounded-md px-2 py-1"
                />
              ) : (
                <p>{patient?.bloodgroup}</p>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Gender
              </span>
              {editMode ? (
                <input
                  type="text"
                  name="gender"
                  value={editedPatient?.gender || ""}
                  onChange={handleInputChange}
                  className="text-black border rounded-md px-2 py-1"
                />
              ) : (
                <p>{patient?.gender}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={editMode ? saveChanges : () => setEditMode(true)}
        className={`${editMode ? "bg-green-500" : "bg-blue-500"} hover:bg-${
          editMode ? "green-700" : "blue-700"
        } text-white font-bold py-2 px-4 rounded mt-4`}
      >
        {editMode ? "Save Changes" : "Edit"}
      </button>
      {editMode && (
        <button
          onClick={() => {
            setEditMode(false);
            setEditIconClicked(false);
            setEditedPatient(patient);
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default ViewEditPatients;
