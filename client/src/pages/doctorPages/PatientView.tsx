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
                Email
              </span>
              <p className="text-black">{patient?.email}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Name
              </span>
              <p className="text-black">{`${patient?.firstName} ${patient?.lastName}`}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Address
              </span>
              <p className="text-black">{patient?.address}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Date of Birth
              </span>
              <p className="text-black">{patient?.dateofbirth}</p>
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
              <p className="text-black">{patient?.chronicillness}</p>
            </div>

            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Blood Group
              </span>
              <p className="text-black">{patient?.bloodgroup}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold  bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Gender
              </span>
              <p className="text-black">{patient?.gender}</p>
            </div>
          </div>
        </div>
      </div>
      {!showDiagnosisForm && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleAddDiagnosis}
            className=" py-3 px-6 rounded-full bg-[#7da466] hover:bg-[#668753] text-white transition-colors duration-200 flex items-center"
          >
            <BsPlus className="inline-block mr-2" size={24} /> Add Diagnosis
          </button>
        </div>
      )}
      {showDiagnosisForm && <DiagnosisForm onCancel={handleCancelDiagnosis} />}
    </div>
  );
};

export default PatientView;
