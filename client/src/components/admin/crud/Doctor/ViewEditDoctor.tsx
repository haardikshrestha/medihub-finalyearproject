import React, { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface Doctor {
  doctorId: string;
  email: string;
  fullname: string;
  nmc: string;
  phonenumber: string;
  expertise: string; // expertise on the left side
  degree: string;
  school: string;
  startTime: string;
  endTime: string;
  daysAvailable: string[];
  fees: string;
}

const ViewEditDoctor: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [editedDoctor, setEditedDoctor] = useState<Doctor | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editIconClicked, setEditIconClicked] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get<Doctor>(
          `http://localhost:5173/getdoctorbyemail/${email}`
        );
        setDoctor(response.data);
        setEditedDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    if (email) {
      fetchDoctor();
    }
  }, [email]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedDoctor((prevDoctor) => ({
      ...prevDoctor!,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      if (!editedDoctor) return;
      await axios.put(
        `http://localhost:5173/updatedoctors/${email}`,
        editedDoctor
      );
      setDoctor(editedDoctor);
      setEditMode(false);
      setEditIconClicked(false);
      toast.success("Doctor updates successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-[#7da466] transition-colors duration-200"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold text-black">Doctor Information</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg border border-[#b3db9c] p-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-[#91BF77] pb-2">
            Personal Information
          </h3>
          <div className="space-y-4 mt-4">
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Doctor ID
              </span>
              <p className="text-black">{doctor?.doctorId}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Email
              </span>
              <p className="text-black">{doctor?.email}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Full Name
              </span>
              {editMode ? (
                <input
                  type="text"
                  name="fullname"
                  value={editedDoctor?.fullname || ""}
                  onChange={handleInputChange}
                  className="text-black border rounded-md px-2 py-1"
                />
              ) : (
                <p>{doctor?.fullname}</p>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                NMC
              </span>
              <p className="text-black">{doctor?.nmc}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Phone Number
              </span>
              <p className="text-black">{doctor?.phonenumber}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Expertise
              </span>
              <p className="text-black">{doctor?.expertise}</p>
            </div>
          </div>
        </div>
        {/* Medical Information */}
        <div>
          <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-[#91BF77] pb-2">
            Medical Information
          </h3>
          <div className="space-y-4 mt-4">
            
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Degree
              </span>
              <p className="text-black">{doctor?.degree}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                School
              </span>
              <p className="text-black">{doctor?.school}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Start Time
              </span>
              <p className="text-black">{doctor?.startTime}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                End Time
              </span>
              <p className="text-black">{doctor?.endTime}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Days Available
              </span>
              <p className="text-black">{doctor?.daysAvailable.join(", ")}</p>
            </div>
            <div className="flex items-center">
              <span className="font-bold bg-[#91BF77] text-white py-1 px-3 rounded-full mr-4">
                Fees
              </span>
              <p className="text-black">{doctor?.fees}</p>
            </div>
          </div>
        </div>
        {/* Add more sections as needed */}
      </div>
      <button
        onClick={editMode ? saveChanges : () => setEditMode(true)}
        className={`${editMode ? "bg-green-500" : "bg-blue-500"} hover:bg-${
          editMode ? "green-700" : "blue-700"
        } text-white font-bold py-2 px-4 rounded mt-4`}
      >
        {editMode ? "Save Changes" : "Edit"}
      </button>
      {editMode && (
        <button
          onClick={() => {
            setEditMode(false);
            setEditIconClicked(false);
            setEditedDoctor(doctor);
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default ViewEditDoctor;
