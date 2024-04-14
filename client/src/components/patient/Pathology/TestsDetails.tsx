import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface LabTest {
 _id: string;
 testFields: string[];
 testName: string;
 testPrice: string;
}

const TestDetails: React.FC = () => {
 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const id = queryParams.get('id');
 const [labTest, setLabTest] = useState<LabTest | null>(null);
 const [formData, setFormData] = useState({
   patientName: '',
   doctorName: '',
   appointmentDate: '',
   testName: '',
 });

 useEffect(() => {
   const fetchLabTest = async () => {
     try {
       const response = await axios.get(`http://localhost:5173/singlelabtest?id=${id}`);
       setLabTest(response.data);
       console.log(response.data);
     } catch (error) {
       console.error('Error fetching lab test:', error);
     }
   };

   if (id) {
     fetchLabTest();
   }
 }, [id]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setFormData({ ...formData, [name]: value });
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (labTest) {
        // Set the test name in formData
        const updatedFormData = { ...formData, testName: labTest.testName, testID:labTest._id};
        await axios.post('http://localhost:5173/scheduleSample', updatedFormData);
        setFormData({ patientName: '', doctorName: '', appointmentDate: '', testName: '' });
        alert('Sample saved successfully!');
      } else {
        throw new Error('Lab test data is missing.');
      }
    } catch (error) {
      console.error('Error saving sample:', error);
      alert('Failed to save sample!');
    }
  };
  
  

 return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-14">
      <div className="bg-white rounded-lg border p-8 max-w-md mb-8 md:mb-0 md:mr-8">
        {labTest ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Lab Test Details</h2>
            <p className="text-gray-700 mb-2 text-sm">
              <span className="font-semibold">Name:</span> {labTest.testName}
            </p>
            <p className="text-gray-700 mb-2 text-sm">
              <span className="font-semibold">Price:</span> Rs. {labTest.testPrice}
            </p>
          </div>
        ) : (
          <p className="text-gray-700 text-center">Loading...</p>
        )}
      </div>
  
      {labTest && (
        <div className="bg-white rounded-lg border p-8 max-w-md">
          <h2 className="text-xl font-bold mb-4">Schedule Test Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Patient Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Doctor Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              placeholder="Appointment Date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="testName"
              value={labTest.testName}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Schedule
            </button>
          </form>
        </div>
      )}
    </div>
  );
  
};

export default TestDetails;