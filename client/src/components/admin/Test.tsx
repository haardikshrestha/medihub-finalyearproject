import React from 'react';

const DoctorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden">
        {/* Your main content goes here */}
        <div className="bg-white p-6 rounded-md shadow-md h-full">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome, Dr. [Doctor's Name]!
          </h1>

          {/* Patient List */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Patient List</h2>
            {/* Sample patient cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Patient Card */}
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2">Patient Name</h3>
                <p className="text-gray-700">Age: 35</p>
                {/* Add more patient information as needed */}
              </div>
              {/* Add more patient cards */}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            {/* Sample appointment cards */}
            <ul>
              <li className="bg-gray-100 p-4 rounded-md shadow-md mb-2">
                <span>Appointment with [Patient Name]</span>
                <span className="text-sm text-gray-500">Time: [Appointment Time]</span>
              </li>
              {/* Add more appointment items */}
            </ul>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {/* Sample notification items */}
            <ul>
              <li className="bg-gray-100 p-4 rounded-md shadow-md mb-2">
                <span>New message from [Patient Name]</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              {/* Add more notification items */}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
