import React from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PatientLabTestCard from "./TestsCard";

const PathologyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddTestClick = () => {
    navigate("/patient/testhistory");
  };

  return (
    <div className="container">
      <div className="flex justify-center items-center mb-8">
        <div className="bg-[#91BF77] border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center hover:bg-[#7da466]">
          <button
            onClick={handleAddTestClick}
            className="text-white flex flex-col items-center"
          >
            <FaEye className="text-xl mb-2" />
            View Test History
          </button>
        </div>
      </div>

      <PatientLabTestCard />
    </div>
  );
};

export default PathologyPage;
