import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateofbirth: string;
  chronicillness: string;
  address: string;
  bloodgroup: string;
  status: string;
  admitdate: string;
  dischargedate: string;
}

const InPatientTable: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5173/get/inpatients");
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFilter = (status: string) => {
    const filtered =
      status === "all" ? patients : patients.filter((patient) => patient.status === status);
    setFilteredPatients(filtered);
    setCurrentPage(1);
  };

  const handleAdd = () =>{
    navigate("/admin/admission");
  }

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  return (
    <div className="">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Patients:</span>
          <span className="font-bold">{filteredPatients.length}</span>
        </div>
        <div>
          <button onClick={handleAdd} className="bg-lime-500 text-white px-4 py-2 rounded">Add Patients</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="mb-3 mt-2">
          <button
            onClick={() => handleFilter("admitted")}
            className="ml-4 bg-blue-500 text-white px-2 py-2 rounded text-sm"
          >
            Admitted
          </button>
          <button
            onClick={() => handleFilter("discharged")}
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded text-sm"
          >
            Discharged
          </button>
          <button
            onClick={() => handleFilter("all")}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded text-sm"
          >
            All
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chronic Illness
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admit Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentPatients.map((patient) => (
              <tr
                key={patient._id}
                className={patient.status === "discharged" ? "bg-gray-200" : ""}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {patient.firstName} {patient.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {patient.chronicillness}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {patient.bloodgroup}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 ml-2 ${
                      patient.status === "admitted"
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    } rounded-full`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {format(new Date(patient.admitdate), "MM/dd/yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredPatients.length / patientsPerPage) },
          (_, i) => (
            <li key={i}>
              <button
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 mx-1 border border-gray-300 rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default InPatientTable;
