import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Importing search icon from react-icons

interface Patient {
  patientId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateofbirth: string;
  chronicillness: string;
  address: string;
  bloodgroup: string;
}

const InPatientForm: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchedPatientId, setSearchedPatientId] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [ward, setWard] = useState<string>('');
  const [bed, setBed] = useState<string>('');
  const [pricingPerDay, setPricingPerDay] = useState<number>(0); // Step 1
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5173/getpatients');
        setPatients(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error fetching patients. Please try again later.');
      }
    };
    fetchPatients();
  }, []);

  const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedPatientId(selectedId);
    const patient = patients.find(patient => patient.patientId === selectedId);
    setSelectedPatient(patient || null);
  };

  const handleSearch = () => {
    const patient = patients.find(patient => patient.patientId === searchedPatientId);
    setSelectedPatient(patient || null);
  };

  const handleSubmit = async () => {
    try {
      // You can perform form validation here before submitting
      // Send the data to your backend for further processing
      // Example:
      const data = {
        selectedPatient,
        department,
        ward,
        bed,
        pricingPerDay
      };
      // Assuming you have a route for admitting patients
      await axios.post('http://localhost:5173/admitpatient', data);
      // Display confirmation message to the user
      alert('Patient admitted successfully!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error admitting patient. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Admit a Patient</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex items-center mb-4">
        <select
          id="patientId"
          name="patientId"
          value={selectedPatientId}
          onChange={handlePatientSelect}
          className="border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          required
        >
          <option value="">Select Patient ID</option>
          {patients.map(patient => (
            <option key={patient.patientId} value={patient.patientId}>
              {patient.patientId}
            </option>
          ))}
        </select>
        <input
          id="searchPatientId"
          type="text"
          value={searchedPatientId}
          onChange={(e) => setSearchedPatientId(e.target.value)}
          className="border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          placeholder="Enter Patient ID"
        />
        <button onClick={handleSearch} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <FaSearch />
        </button>
      </div>
      {selectedPatient && (
        <div>
          <div className="border rounded p-4 mb-4">
            <p><strong>Email:</strong> {selectedPatient.email}</p>
            <p><strong>First Name:</strong> {selectedPatient.firstName}</p>
            <p><strong>Last Name:</strong> {selectedPatient.lastName}</p>
            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
            <p><strong>Date of Birth:</strong> {selectedPatient.dateofbirth}</p>
            <p><strong>Chronic Illness:</strong> {selectedPatient.chronicillness}</p>
            <p><strong>Address:</strong> {selectedPatient.address}</p>
            <p><strong>Blood Group:</strong> {selectedPatient.bloodgroup}</p>
          </div>
          <div className="flex mb-4">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            >
              <option value="">Select Department</option>
              {/* Populate with department options */}
            </select>
            <select
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              className="border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            >
              <option value="">Select Ward</option>
              {/* Populate with ward options */}
            </select>
            <select
              value={bed}
              onChange={(e) => setBed(e.target.value)}
              className="border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            >
              <option value="">Select Bed</option>
              {/* Populate with bed options */}
            </select>
            
          </div>
          <p><strong>Pricing Per Day:</strong> Rs.{pricingPerDay}</p>
          <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3">
            Admit Patient
          </button>
          
        </div>
      )}
    </div>
  );
};

export default InPatientForm;
