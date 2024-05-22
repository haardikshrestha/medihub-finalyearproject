import React, { useState } from 'react';
import { IoMdPerson, IoMdNotifications } from "react-icons/io";
import PatientProfile from "@/components/patient/Profile/PatientProfile";
import PatientNotifications from '@/components/patient/Settings/Notifications';
import TermsAndConditions from '@/components/patient/Settings/Terms';

const PatientSettingsPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'profile' | 'notifications' | 'terms'>('profile');

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 rounded-lg px-4 py-7">
      <div className="flex justify-center mb-6 w-full">
        <div className="flex justify-between w-1/2 max-w-xl rounded-full bg-white shadow-md py-2 px-4">
          <button
            onClick={() => setSelectedView('profile')}
            className={`text-gray-500 hover:text-[#7da466] focus:outline-none ${selectedView === 'profile' ? 'text-[#7da466]' : ''}`}
          >
            <IoMdPerson className="h-6 w-6" />
          </button>
          <button
            onClick={() => setSelectedView('notifications')}
            className={`text-gray-500 hover:text-[#7da466] focus:outline-none ${selectedView === 'notifications' ? 'text-[#7da466]' : ''}`}
          >
            <IoMdNotifications className="h-6 w-6" />
          </button>
          <button
            onClick={() => setSelectedView('terms')}
            className={`text-gray-500 hover:text-[#7da466] focus:outline-none ${selectedView === 'terms' ? 'text-[#7da466]' : ''}`}
          >
            <span className="h-6 w-6" title="Terms and Conditions">T&C</span>
          </button>
        </div>
      </div>
      {selectedView === 'profile' && <PatientProfile />}
      {selectedView === 'notifications' && <PatientNotifications />}
      {selectedView === 'terms' && <TermsAndConditions />}
    </div>
  );
};

export default PatientSettingsPage;
