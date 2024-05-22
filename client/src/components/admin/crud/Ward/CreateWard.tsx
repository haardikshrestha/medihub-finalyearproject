import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

interface Department {
  _id: string;
  depID: string;
  depName: string;
  depNameShort: string;
}

const CreateWardPage: React.FC = () => {
  const [wardID, setWardID] = useState<string>('');
  const [departmentShortName, setDepartmentShortName] = useState<string>('');
  const [numberOfBeds, setNumberOfBeds] = useState<string>('');
  const [startBedID, setStartBedID] = useState<string>('');
  const [endBedID, setEndBedID] = useState<string>('');
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5173/getdepartments');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const departmentsData: Department[] = await response.json();
        setDepartments(departmentsData);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const wardIdentifier = wardID + '-' + departmentShortName;

      const response = await fetch('http://localhost:5173/newward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wardId: wardIdentifier,
          numberOfBeds: numberOfBeds,
          startBedID: startBedID,
          endBedID: endBedID,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      console.log('Ward added successfully!');
      toast.success('Ward added!');
    } catch (error) {
      console.error('Error adding ward:', error);
      toast.error('Error adding ward!');
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Create New Ward</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="departmentShortName" className="block text-gray-700 font-bold mb-2">
            Department Short Name
          </label>
          <select
            id="departmentShortName"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={departmentShortName}
            onChange={(e) => setDepartmentShortName(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department.depNameShort}>
                {department.depNameShort} - {department.depID}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="wardID" className="block text-gray-700 font-bold mb-2">
            Ward ID
          </label>
          <input
            type="text"
            id="wardID"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Ward ID"
            value={wardID}
            onChange={(e) => setWardID(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numberOfBeds" className="block text-gray-700 font-bold mb-2">
            Number of Beds
          </label>
          <input
            type="number"
            id="numberOfBeds"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Number of Beds"
            value={numberOfBeds}
            onChange={(e) => setNumberOfBeds(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startBedID" className="block text-gray-700 font-bold mb-2">
            Start Bed ID
          </label>
          <input
            type="text"
            id="startBedID"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Start Bed ID"
            value={startBedID}
            onChange={(e) => setStartBedID(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="endBedID" className="block text-gray-700 font-bold mb-2">
            End Bed ID
          </label>
          <input
            type="text"
            id="endBedID"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter End Bed ID"
            value={endBedID}
            onChange={(e) => setEndBedID(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Add Ward
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWardPage;
