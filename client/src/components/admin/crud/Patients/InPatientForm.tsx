import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

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

interface Ward {
  _id: string;
  wardId: string;
  numberOfBeds: number;
  bedIds: string[];
}

const InPatientForm: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchedPatientId, setSearchedPatientId] = useState<string>('');
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [bedIds, setBedIds] = useState<string[]>([]);
  const [selectedBed, setSelectedBed] = useState<string>('');
  const [pricingPerDay, setPricingPerDay] = useState<number>(0);
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

    const fetchWards = async () => {
      try {
        const response = await axios.get('http://localhost:5173/wards');
        setWards(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error fetching wards. Please try again later.');
      }
    };

    fetchPatients();
    fetchWards();
  }, []);

  const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedPatientId(selectedId);
    const patient = patients.find(patient => patient.patientId === selectedId);
    setSelectedPatient(patient || null);
  };

  const handleWardSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWardId = e.target.value;
    setSelectedWard(selectedWardId);
    const ward = wards.find(ward => ward.wardId === selectedWardId);
    setBedIds(ward ? ward.bedIds : []);
    setSelectedBed(''); 
  };

  const handleSearch = () => {
    const patient = patients.find(patient => patient.patientId === searchedPatientId);
    setSelectedPatient(patient || null);
  };

  const handleSubmit = async () => {
    if (!selectedPatient) {
      setErrorMessage('Please select a patient.');
      return;
    }

    const data = {
      patientId: selectedPatient.patientId,
      email: selectedPatient.email,
      firstName: selectedPatient.firstName,
      lastName: selectedPatient.lastName,
      gender: selectedPatient.gender,
      dateofbirth: selectedPatient.dateofbirth,
      chronicillness: selectedPatient.chronicillness,
      address: selectedPatient.address,
      bloodgroup: selectedPatient.bloodgroup,
      admitdate: new Date().toISOString(), // Current date as admitdate
      ward: selectedWard,
      bed: selectedBed,
      pricingPerDay
    };

    try {
      await axios.post('http://localhost:5173/admitpatient', data);
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
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
              value={selectedWard}
              onChange={handleWardSelect}
              className="border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            >
              <option value="">Select Ward</option>
              {wards.map(ward => (
                <option key={ward._id} value={ward.wardId}>
                  {ward.wardId}
                </option>
              ))}
            </select>
            <select
              value={selectedBed}
              onChange={(e) => setSelectedBed(e.target.value)}
              className="border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              disabled={!selectedWard}
            >
              <option value="">Select Bed</option>
              {bedIds.map((bedId, index) => (
                <option key={index} value={bedId}>
                  {bedId}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3">
            Admit Patient
          </button>
        </div>
      )}
    </div>
  );
};

export default InPatientForm;
