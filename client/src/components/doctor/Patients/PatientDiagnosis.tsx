import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaFileAlt, FaCalendarAlt } from "react-icons/fa";

interface DiagnosisData {
  _id: string;
  patientEmail: string;
  doctorEmail: string;
  diagnosis: string;
  medications: {
    name: string;
    dosage: string;
    timeOfDay: string;
    beforeOrAfterEating: string;
    _id: string;
  }[];
  notes: string;
  pdfBuffer: { type: string; data: number[] };
  createdAt: string;
}

const DiagnosisCardPatient: React.FC = () => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisData[]>([]);
  const [filteredDiagnoses, setFilteredDiagnoses] = useState<DiagnosisData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      const filtered = diagnoses.filter((diagnosis) =>
        diagnosis.patientEmail.toLowerCase() === emailParam.toLowerCase()
      );
      setFilteredDiagnoses(filtered);
    }
  }, [diagnoses]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5173/diagnosis`);
      setDiagnoses(response.data.diagnosis);
    } catch (error) {
      console.error("Error fetching diagnoses:", error);
      toast.error("Error fetching diagnoses!");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const openPdf = (pdfData: number[], filename: string) => {
    const bytes = new Uint8Array(pdfData);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="container mt-4">
      {filteredDiagnoses.length === 0 ? (
        <div className="text-center my-8">
          <p className="text-gray-600 mb-4">You have no diagnoses available for this email.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredDiagnoses.map((diagnosis) => (
            <div
              key={diagnosis._id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full"
            >
              <div className="px-6 py-4 bg-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">
                    {diagnosis.diagnosis}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <FaCalendarAlt className="inline-block mr-1" />{" "}
                    {formatDate(diagnosis.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Patient Email: {diagnosis.patientEmail}
                  </p>
                </div>
                <FaFileAlt className="text-gray-600 text-3xl" />
              </div>
              <div className="px-6 py-4 flex justify-center">
                <button
                  onClick={() =>
                    openPdf(diagnosis.pdfBuffer.data, `diagnosis-${diagnosis._id}.pdf`)
                  }
                  className="bg-[#7da466] hover:bg-[#688e55] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
                >
                  <FaFileAlt className="mr-2" /> View Diagnosis
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiagnosisCardPatient;
