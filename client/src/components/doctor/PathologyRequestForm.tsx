import React, { useState, FormEvent } from 'react';
import { FaUserInjured, FaCircleNotch, FaClipboardCheck } from 'react-icons/fa';

const PathologyRequestForm: React.FC = () => {
  const [patientName, setPatientName] = useState<string>('');
  const [testToBeDone, setTestToBeDone] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add logic to handle form submission, such as sending data to the server
    console.log('Form submitted:', { patientName, testToBeDone, additionalNotes });
    // Reset form fields
    setPatientName('');
    setTestToBeDone('');
    setAdditionalNotes('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#91BF77] to-[#75a559]">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-2xl">
        <div className="flex justify-center mb-6">
          <FaCircleNotch className="text-[#91BF77] text-5xl" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Request Lab Test</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaUserInjured className="text-gray-500 mr-2" /> Patient Name
            </label>
            <input
              type="text"
              id="patientName"
              className="block w-full border-2 border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#91BF77] focus:border-[#91BF77] sm:text-sm"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="testToBeDone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaCircleNotch className="text-gray-500 mr-2" /> Test to be Done
            </label>
            <input
              type="text"
              id="testToBeDone"
              className="block w-full border-2 border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#91BF77] focus:border-[#91BF77] sm:text-sm"
              placeholder="Enter test to be done"
              value={testToBeDone}
              onChange={(e) => setTestToBeDone(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaClipboardCheck className="text-gray-500 mr-2" /> Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              rows={5}
              className="block w-full border-2 border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#91BF77] focus:border-[#91BF77] sm:text-sm"
              placeholder="Enter additional notes (if any)"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#91BF77] hover:bg-[#75a559] text-white py-3 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-[#75a559] transition duration-300"
            >
              Request Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PathologyRequestForm;