import React, { useEffect, useState } from 'react';

const DoctorGreeting = () => {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const getCurrentTimeOfDay = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setTimeOfDay('morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    };

    getCurrentTimeOfDay();
    const intervalId = setInterval(getCurrentTimeOfDay, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex justify-between items-start p-5'>
      <div className='doctor-greeting bg-white border rounded-md flex items-center p-5 space-x-5'>
        <div className='greeting-text'>
          <p className='text-xl font-semibold'>Good {timeOfDay},</p>
          <p>Dr. Hardik Shrestha</p>
        </div>
        <div className='greeting-image'>
          <img
            src={`src/assets/${timeOfDay}.png`}
            alt="timeimage"
            className='w-16 h-16 object-cover'
          />
        </div>
      </div>
      <div className='appointments-box bg-gray-200 border rounded-md flex flex-col items-center p-5'>
        <div className='appointment-number text-4xl font-bold mb-2'>3</div>
        <p className='appointment-text text-sm text-gray-600'>Appointments today</p>
      </div>
    </div>
  );
};

export default DoctorGreeting;
