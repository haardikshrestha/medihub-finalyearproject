import React, { useState } from 'react';
import { IoMdPerson } from "react-icons/io";
import { MdFeedback } from "react-icons/md"; // Feedback icon
import PatientProfile from "@/components/patient/Profile/PatientProfile";
import TermsAndConditions from '@/components/patient/Settings/Terms';
import PatientFeedbackForm from './Feedback/PatientFeedback';

const PatientSettingsPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'profile' | 'feedback' | 'terms'>('profile');

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
            onClick={() => setSelectedView('feedback')}
            className={`text-gray-500 hover:text-[#7da466] focus:outline-none ${selectedView === 'feedback' ? 'text-[#7da466]' : ''}`}
          >
            <MdFeedback className="h-6 w-6" />
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
      {selectedView === 'feedback' && <PatientFeedbackForm />}
      {selectedView === 'terms' && <TermsAndConditions />}
    </div>
  );
};

export default PatientSettingsPage;
