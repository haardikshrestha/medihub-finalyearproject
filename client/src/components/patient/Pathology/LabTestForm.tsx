import React, { useState } from 'react';

interface LabTestFormProps {
  onClose: () => void;
}

const LabTestForm: React.FC<LabTestFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    testName: '',
    testDate: '',
    testType: '',
    testDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Schedule New Lab Test</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testName">
              Test Name
            </label>
            <input
              type="text"
              name="testName"
              value={formData.testName}
              onChange={handleChange}
              placeholder="Enter test name"
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testDate">
              Test Date
            </label>
            <input
              type="date"
              name="testDate"
              value={formData.testDate}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testType">
              Test Type
            </label>
            <input
              type="text"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              placeholder="Enter test type"
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testDescription">
              Test Description
            </label>
            <textarea
              name="testDescription"
              value={formData.testDescription}
              onChange={handleChange}
              placeholder="Enter test description"
              className="input-field"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
        <button onClick={onClose} className="text-blue-500 hover:text-blue-700 mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default LabTestForm;
