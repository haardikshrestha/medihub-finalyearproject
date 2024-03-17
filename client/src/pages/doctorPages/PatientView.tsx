import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsPlus } from "react-icons/bs";
import DiagnosisForm from "@/components/doctor/DiagnosisForm";

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

const PatientView: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
  const navigate = useNavigate();

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

  const handleAddDiagnosis = () => {
    setShowDiagnosisForm(true);
  };

  const handleCancelDiagnosis = () => {
    setShowDiagnosisForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Patient Information</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Email:</span> {patient?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Name:</span>{" "}
              {`${patient?.firstName} ${patient?.lastName}`}
            </p>
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Gender:</span> {patient?.gender}
            </p>
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Date of Birth:</span>{" "}
              {patient?.dateofbirth}
            </p>
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Chronic Illness:</span>{" "}
              {patient?.chronicillness}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Address:</span> {patient?.address}
            </p>
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Blood Group:</span>{" "}
              {patient?.bloodgroup}
            </p>
          </div>
        </div>
      </div>
      {!showDiagnosisForm && (
        <div>
          <button
            onClick={handleAddDiagnosis}
            className="bg-[#8AC185] p-3 rounded-xl mt-5 text-sm flex items-center"
          >
            <BsPlus className="inline-block mr-2" size={24} />
            Add Diagnosis
          </button>
        </div>
      )}
      {showDiagnosisForm && <DiagnosisForm onCancel={handleCancelDiagnosis} />}
    </div>
  );
};

export default PatientView;
