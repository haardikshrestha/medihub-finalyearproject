import React, { useState } from 'react';
import axios from 'axios';

interface InPatient {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateofbirth: string;
  chronicillness: string;
  address: string;
  bloodgroup: string;
  admitdate: string;
  dischargedate: string;
  ward: string;
  status: string;
  medications: { [key: string]: string };
}

const InPatientForm: React.FC = () => {
  const [inPatient, setInPatient] = useState<InPatient>({
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateofbirth: '',
    chronicillness: '',
    address: '',
    bloodgroup: '',
    admitdate: '',
    dischargedate: '',
    ward: '',
    status: '',
    medications: {},
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInPatient({ ...inPatient, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5173/new/inpatients', inPatient);
      console.log(response.data.message);
      setInPatient({
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      dateofbirth: '',
      chronicillness: '',
      address: '',
      bloodgroup: '',
      admitdate: '',
      dischargedate: '',
      ward: '',
      status: '',
      medications: {},
    });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Admit a patient</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700  mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={inPatient.email}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700  mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={inPatient.firstName}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700  mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={inPatient.lastName}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700  mb-2">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={inPatient.gender}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateofbirth" className="block text-gray-700  mb-2">
            Date of Birth
          </label>
          <input
            type="text"
            id="dateofbirth"
            name="dateofbirth"
            value={inPatient.dateofbirth}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="chronicillness" className="block text-gray-700  mb-2">
            Chronic Illness
          </label>
          <input
            type="text"
            id="chronicillness"
            name="chronicillness"
            value={inPatient.chronicillness}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700  mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={inPatient.address}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bloodgroup" className="block text-gray-700  mb-2">
            Blood Group
          </label>
          <input
            type="text"
            id="bloodgroup"
            name="bloodgroup"
            value={inPatient.bloodgroup}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="admitdate" className="block text-gray-700  mb-2">
            Admit Date
          </label>
          <input
            type="text"
            id="admitdate"
            name="admitdate"
            value={inPatient.admitdate}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dischargedate" className="block text-gray-700  mb-2">
            Discharge Date
          </label>
          <input
            type="text"
            id="dischargedate"
            name="dischargedate"
            value={inPatient.dischargedate}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ward" className="block text-gray-700  mb-2">
            Ward
          </label>
          <input
            type="text"
            id="ward"
            name="ward"
            value={inPatient.ward}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700  mb-2">
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={inPatient.status}
            onChange={handleInputChange}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#91BF77] hover:bg-[#91BF99] text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Admit Inpatient
          </button>
        </div>
      </form>
    </div>
  );
};

export default InPatientForm;
