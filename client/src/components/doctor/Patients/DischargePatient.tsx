import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const DischargePatient: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [dischargeSummary, setDischargeSummary] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Update the patient status to "discharged"
      await axios.put(`http://localhost:5173/update/inpatients/${email}`, { status: 'discharged' });

      // Send discharge summary report to the patient's email as a PDF file
      await axios.post(`http://localhost:5173/send/discharge-summary/${email}`, {
        dischargeSummary,
      });

      navigate(`/doctor/inpatientdetails?email=${email}`);
    } catch (error) {
      console.error('Error discharging patient:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Discharge Patient</h1>
      <form onSubmit={handleSubmit} className="bg-white border rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="dischargeSummary" className="block text-gray-700 font-bold mb-2">
            Discharge Summary
          </label>
          <textarea
            id="dischargeSummary"
            name="dischargeSummary"
            value={dischargeSummary}
            onChange={(e) => setDischargeSummary(e.target.value)}
            className="border appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-[#91BF77] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Discharge Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default DischargePatient;
