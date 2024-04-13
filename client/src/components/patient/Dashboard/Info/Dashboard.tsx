import React from 'react';

interface Patient {
  name: string;
  gender: string;
  age: number;
  phone: string;
  appointmentTime: string;
  waitedTime: string;
}

const patient: Patient[] = [
  {
    name: 'Varun Bose',
    gender: 'Male',
    age: 32,
    phone: '7609947483',
    appointmentTime: '05:10 PM',
    waitedTime: '56 Mins',
  },
  {
    name: 'Jhon Wick',
    gender: 'Male',
    age: 45,
    phone: '8015295125',
    appointmentTime: '04:30 PM',
    waitedTime: '30 Mins',
  },
  {
    name: 'Johny Ive',
    gender: 'Male',
    age: 31,
    phone: '2035006370',
    appointmentTime: '03:50 PM',
    waitedTime: '25 Mins',
  },
  {
    name: 'Sufiya',
    gender: 'Female',
    age: 28,
    phone: '9245787845',
    appointmentTime: '03:45 PM',
    waitedTime: '1.35 Hrs',
  },
  {
    name: 'David John',
    gender: 'Male',
    age: 35,
    phone: '6154817037',
    appointmentTime: '06:10 PM',
    waitedTime: 'Not Arrived',
  },
  {
    name: 'Emma',
    gender: 'Female',
    age: 30,
    phone: '7608440455',
    appointmentTime: '06:30 PM',
    waitedTime: 'Not Arrived',
  },
];

const Dashboard: React.FC = () => {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Home</h1>
            <div className="flex space-x-4">
              <div className="bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2">
                <span className="font-semibold">06</span>
                <span className="text-sm">Queue</span>
              </div>
              <div className="bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2">
                <span className="font-semibold">02</span>
                <span className="text-sm">Earlier</span>
              </div>
              <div className="bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2">
                <span className="font-semibold">05</span>
                <span className="text-sm">Wait List</span>
              </div>
              <div className="bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center space-x-2">
                <span className="font-semibold">00</span>
                <span className="text-sm">No Show</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="text-gray-600 font-semibold">PATIENT</div>
            <div className="text-gray-600 font-semibold">CONTACT</div>
            <div className="text-gray-600 font-semibold">APPOINTMENT</div>
            <div className="text-gray-600 font-semibold">WAITED</div>
            <div></div>
          </div>
          {patient.map((patient, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center mb-4 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-800">{patient.name}</div>
                  <div className="text-gray-500">
                    {patient.gender}, {patient.age} yr
                  </div>
                </div>
              </div>
              <div className="text-gray-800">{patient.phone}</div>
              <div className="text-gray-800">{patient.appointmentTime}</div>
              <div className="text-gray-800">{patient.waitedTime}</div>
              <div className="flex justify-end">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Vitals
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Dashboard;