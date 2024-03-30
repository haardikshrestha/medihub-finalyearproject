import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface AppointmentFormProps {
  doctor: {
    name: string;
    specialty: string;
    avatar: string;
  };
  onSubmit: (formData: AppointmentFormData) => void;
}

interface AppointmentFormData {
  date: string;
  time: string;
  reason: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctor, onSubmit }) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    date: '',
    time: '',
    reason: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex items-center mb-6">
          <img
            src={doctor.avatar}
            alt={`${doctor.name}'s avatar`}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <FaCalendarAlt className="text-gray-500" />
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
              Time
            </label>
            <div className="relative">
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <FaClock className="text-gray-500" />
              </span>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="reason" className="block text-gray-700 font-bold mb-2">
              Reason for Appointment
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Book Appointment
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Example usage
const doctor = {
  name: 'Dr. Kathryn Murphy',
  specialty: 'Urologist',
  avatar: 'https://example.com/doctor1.jpg',
};

const handleSubmit = (formData: AppointmentFormData) => {
  console.log('Appointment form data:', formData);
  // Handle form submission logic here
};

const AppointmentDetails = () => {
  return (
    <div>
      <AppointmentForm doctor={doctor} onSubmit={handleSubmit} />
    </div>
  );
};

export default AppointmentDetails;