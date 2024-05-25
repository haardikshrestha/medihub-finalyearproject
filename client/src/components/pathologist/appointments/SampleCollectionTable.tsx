import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SampleCollection {
  _id: string;
  patientEmail: string;
  doctorName: string;
  appointmentDate: string;
  testName: string;
  status: "Sample Pending" | "Test Pending" | "Test Completed" | "Cancelled";
  testID: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const SampleCollectionTable: React.FC = () => {
  const [sampleCollections, setSampleCollections] = useState<SampleCollection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<SampleCollection[]>([]);
  const [filter, setFilter] = useState<
    "All" | "Sample Pending" | "Test Pending" | "Test Completed" | "Cancelled"
  >("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSampleCollections();
  }, []);

  useEffect(() => {
    let collections = sampleCollections;
    if (filter !== "All") {
      collections = collections.filter((collection) => collection.status === filter);
    }
    if (searchTerm) {
      collections = collections.filter(
        (collection) =>
          `${user?.firstName} ${user?.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          collection.testName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (startDate && endDate) {
      collections = collections.filter((collection) => {
        const appointmentDate = new Date(collection.appointmentDate);
        return appointmentDate >= startDate && appointmentDate <= endDate;
      });
    }
    setFilteredCollections(collections);
  }, [sampleCollections, filter, searchTerm, startDate, endDate]);
  const [userMap, setUserMap] = useState<{ [key: string]: User }>({});
  const fetchSampleCollections = async () => {
    try {
      const response = await axios.get<SampleCollection[]>(
        "http://localhost:5173/samplecollections/get/all",
      );
      setSampleCollections(response.data);
      const newUserMap: { [key: string]: User } = {};
      for (const sampleCollection of response.data) {
        const userResponse = await axios.get<User>(
          `http://localhost:5173/getbyemail/patient/${sampleCollection.patientEmail}`,
        );
        newUserMap[sampleCollection.patientEmail] = userResponse.data;
      }
      setUserMap(newUserMap);
    } catch (error) {
      console.error("Error fetching sample collections:", error);
    }
  };

  const handleFilterChange = (
    newFilter: "All" | "Sample Pending" | "Test Pending" | "Test Completed" | "Cancelled",
  ) => {
    setFilter(newFilter);
  };

  const handleStatusChange = async (
    sampleCollectionId: string,
    newStatus: SampleCollection["status"],
  ) => {
    if (newStatus === "Cancelled") {
      return;
    }

    try {
      await axios.put(
        `http://localhost:5173/samplecollections/${sampleCollectionId}/updateStatus`,
        { status: newStatus },
      );

      setSampleCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection._id === sampleCollectionId
            ? { ...collection, status: newStatus }
            : collection,
        ),
      );

      if (newStatus === "Test Pending") {
        navigate(`/pathologist/createtest?sampleId=${sampleCollectionId}`);
      }
    } catch (error) {
      console.error(
        `Error updating status of ${sampleCollectionId} to ${newStatus}:`,
        error,
      );
    }
  };

  return (
    <div className="container mx-auto min-h-screen">
      <h1 className="text-2xl mb-6 text-gray-800 font-bold text-center">
        Sample Collection
      </h1>
      <div className="mb-6 flex justify-center space-x-2">
        {["All", "Sample Pending", "Test Pending", "Test Completed", "Cancelled"].map(
          (filterOption, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                filter === filterOption
                  ? {
                      All: "bg-blue-500 text-white hover:bg-blue-600",
                      "Sample Pending": "bg-yellow-500 text-white hover:bg-yellow-600",
                      "Test Pending": "bg-blue-500 text-white hover:bg-blue-600",
                      "Test Completed": "bg-green-500 text-white hover:bg-green-600",
                      Cancelled: "bg-red-500 text-white hover:bg-red-600",
                    }[filterOption]
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleFilterChange(filterOption as any)}
            >
              {filterOption}
            </button>
          ),
        )}
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name or test name"
            className="block w-full py-3 pl-10 pr-4 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="block w-full py-3 px-4 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="flex-2">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="block w-full py-3 px-4 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Patient</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Test Name</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredCollections.map((sampleCollection, index) => (
              <tr
                key={sampleCollection._id}
                className={`border-b border-gray-200 text-sm ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-4 px-6">
                  {userMap[sampleCollection.patientEmail]
                    ? `${userMap[sampleCollection.patientEmail]?.firstName} ${
                        userMap[sampleCollection.patientEmail]?.lastName
                      }`
                    : ""}
                </td>
                <td className="py-4 px-6">{sampleCollection.appointmentDate}</td>
                <td className="py-4 px-6">{sampleCollection.testName}</td>
                <td className="py-4 px-6 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      {
                        "Sample Pending": "bg-yellow-500",
                        "Test Pending": "bg-blue-500",
                        "Test Completed": "bg-green-500",
                        Cancelled: "bg-red-500",
                      }[sampleCollection.status]
                    }`}
                  >
                    {sampleCollection.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  {sampleCollection.status !== "Cancelled" && (
                    <>
                      {sampleCollection.status === "Sample Pending" ? (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition-colors duration-300"
                          onClick={() =>
                            handleStatusChange(sampleCollection._id, "Test Pending")
                          }
                        >
                          Test
                        </button>
                      ) : sampleCollection.status === "Test Pending" ? (
                        <button
                          className="bg-amber-500
                          hover:bg-amber-700 text-white py-2 px-4 rounded-full transition-colors duration-300"
                          onClick={() =>
                            navigate(
                              `/pathologist/createtest?sampleId=${sampleCollection._id}`,
                            )
                          }
                        >
                          Go to Testing
                        </button>
                      ) : sampleCollection.status === "Test Completed" ? (
                        <button
                          className="bg-white border border-green-500 text-green-500 py-2 px-4 rounded-full cursor-not-allowed"
                          disabled
                        >
                          Test Sent!
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full transition-colors duration-300"
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
