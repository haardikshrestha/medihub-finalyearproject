// CalendarPage.js
import React from 'react';

const CalendarPage = () => {
  const doctorDetails = {
    name: 'Dr. John Doe',
    specialization: 'Cardiologist',
    location: 'Medical Center',
    image: '/src/assets/doc.png', // Update with the actual image URL
  };

  const days = [
    { date: '2024-02-01', tokens: 3 },
    { date: '2024-02-02', tokens: 2 },
    { date: '2024-02-03', tokens: 1 },
    // Add more days as needed
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
        <div className="flex justify-center items-center bg-lime-200 h-20 ">
          <img
            src={doctorDetails.image}
            alt="Doctor"
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{doctorDetails.name}</h2>
          <p className="text-gray-600 mb-2">{doctorDetails.specialization}</p>
          <button className='bg-lime-500 text-white font-medium text-sm py-2 px-4 rounded-full hover:bg-lime-600 transition duration-300'>View full details</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {days.map((day, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">{new Date(day.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</h3>
              <p className="text-gray-600 mb-4 text-xs">Tokens Available: {day.tokens}</p>
              <button className="bg-lime-500 text-white font-medium text-sm py-2 px-4 rounded-full hover:bg-lime-600 transition duration-300">Book Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
