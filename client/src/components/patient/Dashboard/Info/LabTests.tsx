import React, { useState, useEffect } from "react";
import axios from "axios";

interface LabReport {
  _id: string;
  patientName: string;
  patientEmail: string;
  testName: string;
  createdAt: Date;
}

const LabTests: React.FC = () => {
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        const response = await axios.get("http://localhost:5173/labreports", {
          params: {
            patientEmail: userEmail,
          },
        });
        setLabReports(response.data);
      } catch (error) {
        console.error("Error fetching lab reports:", error);
      }
    };

    fetchLabReports();
  }, [userEmail]);

  return (
    <div className="">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Your Lab Test History</h2>
      <table className="w-full table-auto min-w-max">
        <thead>
          <tr className="text-left bg-gray-100 border-b border-gray-200 font-medium">
            <th className="p-4">Test Name</th>
            <th className="p-4">Date</th>
            <th className="p-4 text-center">Download</th>
          </tr>
        </thead>
        <tbody>
          {labReports.map((report) => (
            <tr key={report._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4">{report.testName}</td>
              <td className="p-4">{new Date(report.createdAt).toLocaleDateString()}</td>
              <td className="p-4 text-center">
                <button
                  className="px-2 py-1 bg-blue-100 text-blue-600 font-bold rounded-lg cursor-not-allowed"
                  disabled
                >
                  Check your mail.
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabTests;
