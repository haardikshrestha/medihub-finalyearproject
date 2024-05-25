import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaFileAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";

interface LabReportData {
  _id: string;
  patientName: string;
  patientEmail: string;
  testName: string;
  createdAt: string;
  pdfBuffer: { type: string; data: number[] };
}

const TestResultsView: React.FC = () => {
  const [labReports, setLabReports] = useState<LabReportData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/getlabreports`);
        setLabReports(response.data);
      } catch (error) {
        console.error("Error fetching lab reports:", error);
        toast.error("Error fetching lab reports!");
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000); 

    return () => clearInterval(interval); 
  }, []);

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

  const filteredLabReports = labReports.filter((report) =>
    report.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mt-4">
      <h1 className="text-2xl mb-6 text-gray-800 font-bold text-center">Lab Reports</h1>
      <div className="mb-4 flex justify-between items-center relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block mr-3 w-full py-3 pl-12 pr-4 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md"
        >
          Clear
        </button>
      </div>
      {filteredLabReports.length === 0 ? (
        <div className="text-center my-8">
          <p className="text-gray-600 mb-4">You have no lab reports available yet.</p>
          <Link
            to="/patient/pathology"
            className="bg-[#91BF77] hover:bg-[#7da466] text-white py-2 px-4 rounded-md flex items-center justify-center"
          >
            <FaCalendarAlt className="mr-2" />
            Schedule Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredLabReports.map((report) => (
            <div
              key={report._id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full"
            >
              <div className="px-6 py-4 bg-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">
                    {report.testName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <FaCalendarAlt className="inline-block mr-1" />
                    {formatDate(report.createdAt)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Patient Email:</span>{" "}
                    {report.patientEmail}
                  </p>
                </div>
                <FaFileAlt className="text-gray-600 text-3xl" />
              </div>
              <div className="px-6 py-4 flex justify-center">
                <button
                  onClick={() =>
                    openPdf(report.pdfBuffer.data, `lab-report-${report._id}.pdf`)
                  }
                  className="bg-[#7da466] hover:bg-[#688e55] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
                >
                  <FaFileAlt className="mr-2" />
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestResultsView;
