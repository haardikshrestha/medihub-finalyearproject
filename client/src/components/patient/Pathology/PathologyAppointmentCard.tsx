import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

interface SampleData {
  _id: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string;
  testName: string;
  status: "Sample Pending" | "Test Pending" | "Test Completed" | "Cancelled";
  testID: string;
  __v: number;
}

const email = localStorage.getItem("email");

const PathologyAppointmentCard: React.FC = () => {
  const [data, setData] = useState<SampleData[]>([]);
  const [filter, setFilter] = useState<
    "Pending" | "Testing" | "Completed" | "Cancelled" | "All"
  >("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5173/api/samples/${email}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCancelAppointment = async (id: string) => {
    confirmAlert({
      title: 'Confirm Cancel Appointment',
      message: 'Are you sure you want to cancel this appointment?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await axios.put(
                `http://localhost:5173/samplecollections/cancel/${id}`,
              );
              toast.success("Appointment cancelled successfully!");
              console.log("Appointment Cancelled:", response.data);
            } catch (error) {
              console.error("Error cancelling appointment:", error);
              toast.error("Error!");
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleViewResults = (testID: string) => {
    console.log("Viewing results:", testID);
  };

  const filteredData = data.filter((item) => {
    if (filter === "All") {
      return true;
    }
    return item.status.includes(filter);
  });

  return (
    <div className="container mt-4">
      {filteredData.length === 0 ? (
        <div className="text-center my-8">
          <p className="text-gray-600 mb-4">You have not scheduled a test yet.</p>
          <Link to="/patient/pathology" className="bg-[#91BF77] hover:bg-[#7da466] text-white py-2 px-4 rounded-md">
            Schedule Now
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex gap-2 mb-6 justify-center">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded-md mr-2 ${
                filter === "All" ? "bg-[#91BF77] text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Pending")}
              className={`px-4 py-2 rounded-md mr-2 ${
                filter === "Pending" ? "bg-[#91BF77] text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("Testing")}
              className={`px-4 py-2 rounded-md mr-2 ${
                filter === "Testing" ? "bg-[#91BF77] text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              Testing
            </button>
            <button
              onClick={() => setFilter("Completed")}
              className={`px-4 py-2 rounded-md mr-2 ${
                filter === "Completed"
                  ? "bg-[#91BF77] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("Cancelled")}
              className={`px-4 py-2 rounded-md ${
                filter === "Cancelled"
                  ? "bg-[#91BF77] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Cancelled
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredData.map((item) => (
              <div
                key={item._id}
                className="bg-gray-100 rounded-lg border overflow-hidden w-full"
              >
                <div className="px-6 py-4 bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{item.testName}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === "Sample Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : item.status === "Test Pending"
                          ? "bg-blue-200 text-blue-800"
                          : item.status === "Test Completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-200">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold">{item.appointmentDate}</p>
                      <p className="text-gray-600">{item.appointmentTime}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-100">
                  <div className="flex justify-center">
                    {item.status === "Sample Pending" && (
                      <button
                        onClick={() => handleCancelAppointment(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-md"
                      >
                        Cancel Appointment
                      </button>
                    )}

                    {item.status === "Test Completed" && (
                      <button
                        onClick={() => handleViewResults(item.testID)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                      >
                        View Results
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PathologyAppointmentCard;
