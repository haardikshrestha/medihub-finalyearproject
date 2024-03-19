import React from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto mt-2">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow ">
            <h2 className="text-xl font-medium mb-4 text-gray-800">Appointments</h2>
            <p className="text-gray-600 text-sm">You have 3 upcoming appointments with the doctor.</p>
            <Link to="/appointments" className="mt-4 text-lime-500 hover:underline">View Details</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow ">
            <h2 className="text-xl font-medium mb-4 text-gray-800">Medical Records</h2>
            <p className="text-gray-600 text-sm">View and manage your medical records here.</p>
            <Link to="/medical-records" className="mt-4 text-lime-500 hover:underline">Explore Records</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow ">
            <h2 className="text-xl font-medium mb-4 text-gray-800">Prescriptions</h2>
            <p className="text-gray-600 text-sm">Check your prescribed medications and instructions.</p>
            <Link to="/prescriptions" className="mt-4 text-lime-500 hover:underline">See Prescriptions</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow ">
            <h2 className="text-xl font-medium mb-4 text-gray-800">Lab Results</h2>
            <p className="text-gray-600 text-sm">View your recent lab results and test reports.</p>
            <Link to="/lab-results" className="mt-4 text-lime-500 hover:underline">Check Results</Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow ">
            <h2 className="text-xl font-medium mb-4 text-gray-800">Messages</h2>
            <p className="text-gray-600 text-sm">Read and reply to messages from your healthcare provider.</p>
            <Link to="/messages" className="mt-4 text-lime-500 hover:underline">Read Messages</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;






























