import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [bedIds, setBedIds] = useState<string[]>([]);
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
  
    const numberOfBedsInt = parseInt(numberOfBeds);
  
    if (isNaN(numberOfBedsInt)) {
      alert('Please enter a valid number for the number of beds');
      return;
    }
  
    if (bedIds.length !== numberOfBedsInt) {
      alert('Number of bed IDs must match the specified number of beds');
      return;
    }
  
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
          bedIds: bedIds,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
  
      console.log('Ward added successfully!');
      toast.success('Ward added successfully!');
    } catch (error: any) {
      console.error('Error adding ward:', error);
      toast.error(error.message);
    }
  };

  const handleBedIdChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newBedIds = [...bedIds];
    newBedIds[index] = e.target.value;
    setBedIds(newBedIds);
  };

  const addBedId = () => {
    if (bedIds.length < parseInt(numberOfBeds)) {
      setBedIds([...bedIds, '']);
    } else {
      toast.error('Cannot add more bed IDs than the specified number of beds');
    }
  };

  const removeBedId = (index: number) => {
    const newBedIds = [...bedIds];
    newBedIds.splice(index, 1);
    setBedIds(newBedIds);
    if (newBedIds.length < parseInt(numberOfBeds)) {
      toast.error('Cannot have fewer bed IDs than the specified number of beds');
    }
  };

  const isFormValid = () => {
    return (
      wardID.trim() !== '' &&
      departmentShortName.trim() !== '' &&
      numberOfBeds.trim() !== '' &&
      bedIds.length === parseInt(numberOfBeds)
    );
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
        <div>
          <label className="block text-gray-700 font-bold mb-2">Bed IDs</label>
          {bedIds.map((bedId, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Enter Bed ID ${index + 1}`}
                value={bedId}
                onChange={(e) => handleBedIdChange(e, index)}
              />
              <button
                type="button"
                className="ml-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                onClick={() => removeBedId(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            onClick={addBedId}
          >
            Add Bed ID
          </button>
        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!isFormValid()}
          >
            Add Ward
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWardPage;
