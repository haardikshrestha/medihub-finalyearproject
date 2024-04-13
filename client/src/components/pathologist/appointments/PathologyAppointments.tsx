import React, { useState, useEffect } from "react";
import axios from "axios";

interface SampleCollection {
  _id: string;
  patientName: string;
  doctorName: string;
  appointmentDateTime: string;
  testType: string;
  status: "Sample Pending" | "Test Pending" | "Test Completed";
  createdAt: string;
}

const SampleCollectionTable = () => {
  const [sampleCollections, setSampleCollections] = useState<SampleCollection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<SampleCollection[]>([]);
  const [filter, setFilter] = useState<
    "All" | "Sample Pending" | "Test Pending" | "Test Completed"
  >("All");

  useEffect(() => {
    fetchSampleCollections();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredCollections(sampleCollections);
    } else {
      setFilteredCollections(
        sampleCollections.filter((collection) => collection.status === filter)
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
    newFilter: "All" | "Sample Pending" | "Test Pending" | "Test Completed"
  ) => {
    setFilter(newFilter);
  };

  const handleStatusChange = (sampleCollectionId: string, newStatus: "Test Pending" | "Test Completed") => {
    // Here, you would make an API call to update the status of the sample collection
    // and then update the state with the new data
    console.log(`Updating status of ${sampleCollectionId} to ${newStatus}`);
  };

  const handleTestingPage = (sampleCollectionId: string) => {
    // Here, you would navigate to the testing page for the specific sample collection
    console.log(`Navigating to testing page for ${sampleCollectionId}`);
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
          className={`px-4 py-2 rounded-md text-white text-sm transition-colors duration-300 ${
            filter === "Test Completed"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => handleFilterChange("Test Completed")}
        >
          Completed
        </button>
      </div>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-4 px-6">Patient</th>
              <th className="py-4 px-6">Doctor</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Type</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Created At</th>
              <th className="py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredCollections.map((sampleCollection) => (
              <tr
                key={sampleCollection._id}
                className="hover:bg-gray-100 border-b border-gray-200 text-sm"
              >
                <td className="py-4 px-6 ">{sampleCollection.patientName}</td>
                <td className="py-4 px-6">{sampleCollection.doctorName}</td>
                <td className="py-4 px-6">
                  {new Date(sampleCollection.appointmentDateTime).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">{sampleCollection.testType}</td>
                <td className="py-4 px-6 flex justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm  ${
                      sampleCollection.status === "Sample Pending"
                        ? "bg-yellow-500"
                        : sampleCollection.status === "Test Pending"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {sampleCollection.status === "Sample Pending"
                      ? "Pending"
                      : sampleCollection.status === "Test Pending"
                      ? "Testing"
                      : "Completed"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {new Date(sampleCollection.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 flex justify-center">
                  {sampleCollection.status === "Sample Pending" ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
                      onClick={() => handleStatusChange(sampleCollection._id, "Test Pending")}
                    >
                      Mark as Testing
                    </button>
                  ) : sampleCollection.status === "Test Pending" ? (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded-md transition-colors duration-300"
                      onClick={() => handleTestingPage(sampleCollection._id)}
                    >
                      Go to Testing
                    </button>
                  ) : (
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white  py-2 px-4 rounded-md transition-colors duration-300"
                      onClick={() => alert("Test completed, sending results to patient")}
                    >
                      Send to Patient
                    </button>
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
