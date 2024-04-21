import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SampleCollection {
  _id: string;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  testName: string;
  status: "Sample Pending" | "Test Pending" | "Test Completed" | "Cancelled";
  testID: string;
}

const SampleCollectionTable = () => {
  const [sampleCollections, setSampleCollections] = useState<SampleCollection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<SampleCollection[]>([]);
  const [filter, setFilter] = useState<
    "All" | "Sample Pending" | "Test Pending" | "Test Completed" | "Cancelled"
  >("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSampleCollections();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredCollections(sampleCollections);
    } else {
      setFilteredCollections(
        sampleCollections.filter((collection) => {
          if (filter === "Cancelled") {
            return collection.status === filter;
          } else {
            return collection.status === filter ;
          }
        })
      );
    }
  }, [sampleCollections, filter]);

  const fetchSampleCollections = async () => {
    try {
      const response = await axios.get("http://localhost:5173/samplecollections/get/all");
      setSampleCollections(response.data);
    } catch (error) {
      console.error("Error fetching sample collections:", error);
    }
  };

  const handleFilterChange = (
    newFilter: "All" | "Sample Pending" | "Test Pending" | "Test Completed" | "Cancelled"
  ) => {
    setFilter(newFilter);
  };

  const handleStatusChange = async (sampleCollectionId: string, newStatus: SampleCollection["status"]) => {

    if (newStatus === "Cancelled") {
      return;
    }

    try {
      await axios.put(`http://localhost:5173/samplecollections/${sampleCollectionId}/updateStatus`, { status: newStatus });

      setSampleCollections(prevCollections =>
        prevCollections.map(collection =>
          collection._id === sampleCollectionId ? { ...collection, status: newStatus } : collection
        )
      );

      if (newStatus === "Test Pending") {
        navigate(`/pathologist/createtest?sampleId=${sampleCollectionId}`);
      }
    } catch (error) {
      console.error(`Error updating status of ${sampleCollectionId} to ${newStatus}:`, error);
    }
  };


  return (
    <div className="container mx-auto">
      <h1 className="text-xl mb-6 text-gray-800 font-bold">Sample Collection</h1>
      <div className="mb-6 flex justify-center">
        <button
          className={`px-4 py-2 rounded-md text-white text-sm mr-2 transition-colors duration-300 ${
            filter === "All"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => handleFilterChange("All")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white text-sm mr-2 transition-colors duration-300 ${
            filter === "Sample Pending"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => handleFilterChange("Sample Pending")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white text-sm mr-2 transition-colors duration-300 ${
            filter === "Test Pending"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => handleFilterChange("Test Pending")}
        >
          Testing
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white text-sm mr-2 transition-colors duration-300 ${
            filter === "Test Completed"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => handleFilterChange("Test Completed")}
        >
          Completed
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white text-sm transition-colors duration-300  ${
            filter === "Cancelled"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => handleFilterChange("Cancelled")}
        >
          Cancelled
        </button>
      </div>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-4 px-6">Sample ID</th>
              <th className="py-4 px-6">Patient</th>
              <th className="py-4 px-6">Doctor</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Test Name</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Test ID</th>
              <th className="py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredCollections.map((sampleCollection) => (
              <tr
                key={sampleCollection._id}
                className="hover:bg-gray-100 border-b border-gray-200 text-sm"
              >
                <td className="py-4 px-6">{sampleCollection._id}</td>
                <td className="py-4 px-6">{sampleCollection.patientName}</td>
                <td className="py-4 px-6">{sampleCollection.doctorName}</td>
                <td className="py-4 px-6">{sampleCollection.appointmentDate}</td>
                <td className="py-4 px-6">{sampleCollection.testName}</td>
                <td className="py-4 px-6 flex justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm  ${
                      sampleCollection.status === "Sample Pending"
                        ? "bg-yellow-500"
                        : sampleCollection.status === "Test Pending"
                        ? "bg-blue-500"
                        : sampleCollection.status === "Test Completed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {sampleCollection.status === "Sample Pending"
                      ? "Pending"
                      : sampleCollection.status === "Test Pending"
                      ? "Testing"
                      : sampleCollection.status === "Test Completed"
                      ? "Completed"
                      : "Cancelled"}
                  </span>
                </td>
                <td className="py-4 px-6">{sampleCollection.testID}</td>
                <td className="py-4 px-6 flex justify-center">
                  {sampleCollection.status !== "Cancelled" && (
                    <>
                      {sampleCollection.status === "Sample Pending" ? (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
                          onClick={() =>
                            handleStatusChange(sampleCollection._id, "Test Pending")
                          }
                        >
                          Test
                        </button>
                      ) : sampleCollection.status === "Test Pending" ? (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded-md transition-colors duration-300"
                          onClick={() => navigate(`/pathologist/createtest?sampleId=${sampleCollection._id}`)}
                        >
                          Go to Testing
                        </button>
                      ) : sampleCollection.status === "Test Completed" ? (
                        <button
                          className="bg-gray-500 hover:bg-gray-700 text-white  py-2 px-4 rounded-md transition-colors duration-300"
                          onClick={() => alert("Test completed, sending results to patient")}
                        >
                          Send to Patient
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
                          onClick={() =>
                            handleStatusChange(sampleCollection._id, "Sample Pending")
                          }
                        >
                          Reschedule
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SampleCollectionTable;
