import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFilePdf, FaEye, FaFlask, FaMicroscope, FaCheck, FaTimes } from "react-icons/fa";

interface SampleData {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  testName: string;
  status: "Sample Pending" | "Test Pending" | "Test Completed" | "Cancelled";
}

const LatestTestResults: React.FC = () => {
  const [latestResult, setLatestResult] = useState<SampleData | null>(null);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SampleData[]>(
          `http://localhost:5173/api/samples/${email}`
        );
        const completedTests = response.data.filter(
          (item) => item.status === "Test Completed"
        );
        if (completedTests.length > 0) {
          setLatestResult(completedTests[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Sample Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Test Pending":
        return "bg-blue-200 text-blue-800";
      case "Test Completed":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusIcon = (status: string): JSX.Element => {
    switch (status) {
      case "Sample Pending":
        return <FaFlask className="text-yellow-800 text-lg" />;
      case "Test Pending":
        return <FaMicroscope className="text-blue-800 text-lg" />;
      case "Test Completed":
        return <FaCheck className="text-green-800 text-lg" />;
      case "Cancelled":
        return <FaTimes className="text-red-800 text-lg" />;
      default:
        return <></>;
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6 w-full relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Latest Test Results</h2>
        <Link to="/patient/testhistory">
          <div className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300">
            <FaEye className="text-gray-600 text-xl" />
          </div>
        </Link>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
        {latestResult ? (
          <>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${getStatusColor(latestResult.status)}`}>
                {getStatusIcon(latestResult.status)}
              </div>
              <div>
                <p className="text-gray-800 font-semibold">{latestResult.testName}</p>
                <p className="text-gray-600">
                  {latestResult.appointmentDate} - {latestResult.appointmentTime}
                </p>
              </div>
            </div>
            <FaFilePdf className="text-red-500 text-xl" />
          </>
        ) : (
          <div className="text-center w-full">
            <p className="text-gray-600 font-semibold">No test results available.</p>
            <Link to="/patient/pathology">
              <button className="bg-[#91BF77] text-white px-4 py-2 rounded hover:bg-[#7da466]">Schedule Test</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestTestResults;
