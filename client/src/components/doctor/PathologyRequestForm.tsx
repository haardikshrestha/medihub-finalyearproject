import React, { useState, FormEvent } from 'react';

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
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Request Lab Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="testToBeDone" className="block text-sm font-medium text-gray-700 mb-1">
            Test to be Done
          </label>
          <input
            type="text"
            id="testToBeDone"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter test to be done"
            value={testToBeDone}
            onChange={(e) => setTestToBeDone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            rows={5}
            className="block w-full border border-gray-300 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter additional notes (if any)"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-[#8AC185] hover:bg-[#78ad72] text-white  py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Request Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default PathologyRequestForm;
