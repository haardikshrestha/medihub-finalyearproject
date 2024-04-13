import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import LabTestForm from "./LabTestForm";
import PatientLabTestCard from "./TestsCard";

interface Test {
  id: string;
  name: string;
  date: string;
  status: "completed" | "pending" | "scheduled";
  pdfUrl?: string;
}

const PathologyPage: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([
    {
      id: "2",
      name: "Blood Test",
      date: "2023-05-01",
      status: "completed",
      pdfUrl: "https://example.com/blood-test.pdf",
    },
    {
      id: "1",
      name: "X-Ray",
      date: "2023-05-05",
      status: "pending",
    },
    {
      id: "3",
      name: "MRI Scan",
      date: "2023-05-10",
      status: "scheduled",
    },
  ]);

  const [showForm, setShowForm] = useState<boolean>(false);

  const completedTests = tests.filter((test) => test.status === "completed");
  const pendingTests = tests.filter((test) => test.status === "pending");
  const scheduledTests = tests.filter((test) => test.status === "scheduled");

  const handleAddTestClick = () => {
    setShowForm(true);
  };

  return (
    <div className="container">
      <div className="flex justify-between mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center w-1/4 mr-4">
          <h2 className="text-lg mb-2 text-green-500 font-bold">Completed</h2>
          <p className="text-3xl font-bold">{completedTests.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center w-1/4 mr-4">
          <h2 className="text-lg mb-2 text-yellow-500 font-bold">Pending</h2>
          <p className="text-3xl font-bold">{pendingTests.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center w-1/4 mr-4">
          <h2 className="text-lg mb-2 text-blue-500 font-bold">Scheduled</h2>
          <p className="text-3xl font-bold">{scheduledTests.length}</p>
        </div>
        <div className="bg-[#91BF77] border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center w-1/4 hover:bg-[#7da466]">
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
