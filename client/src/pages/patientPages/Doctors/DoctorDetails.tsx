import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaUserMd, FaEnvelope, FaClock, FaCalendarAlt, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Doctor {
  _id?: string;
  fullName: string;
  expertise: string;
  email: string;
  degree: string;
  school: string;
  startTime: string;
  endTime: string;
  daysAvailable: string[];
  fees: string;
}

const DoctorDetails: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        const patientEmail = localStorage.getItem('email');
        if (!email) {
          throw new Error('Email parameter is missing');
        }
        const response = await axios.get(`http://localhost:5173/getdoctorbyemail/${email}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [location.search]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const isDateAvailable = (date: Date) => {
    const daysAvailable = doctor?.daysAvailable || [];
    const dayOfWeek = date.getDay();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    return daysAvailable.includes(dayName);
  };

  const getTimeSlotsForSelectedDate = () => {
    if (!selectedDate || !doctor || !doctor.startTime || !doctor.endTime) return [];

    let startHour, startMinute, endHour, endMinute;

    try {
      const [startHourStr, startMinuteStr] = doctor.startTime.split(':');
      startHour = parseInt(startHourStr, 10);
      startMinute = parseInt(startMinuteStr, 10);

      const [endHourStr, endMinuteStr] = doctor.endTime.split(':');
      endHour = parseInt(endHourStr, 10);
      endMinute = parseInt(endMinuteStr, 10);
    } catch (error) {
      console.error('Invalid time format:', error);
      return [];
    }

    if (
      isNaN(startHour) ||
      isNaN(startMinute) ||
      isNaN(endHour) ||
      isNaN(endMinute)
    ) {
      console.error('Invalid time format');
      return [];
    }

    const timeSlots = [];
    let hour = startHour;
    let minute = startMinute;

    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const timeSlot = `${formattedHour}:${formattedMinute}`;
      timeSlots.push(timeSlot);

      if (minute === 45) {
        minute = 0;
        hour++;
      } else {
        minute += 15;
      }
    }

    return timeSlots;
  };

  const renderTimeSlots = () => {
    const timeSlots = getTimeSlotsForSelectedDate();
    return (
      <div>
        <p>Select Time:</p>
        <select value={selectedTime || ''} onChange={(e) => handleTimeChange(e.target.value)}>
          <option value="">Select a time</option>
          {timeSlots.map((timeSlot, index) => (
            <option key={index} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const handleAppointmentBooking = () => {
    // Implement your booking logic here
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
    // You can send this information to your backend for processing
  };

  return (
    <div className="flex flex-col items-center w-full">
      {isLoading ? (
        <p className="text-center text-gray-600">Loading doctor details...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : doctor ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#91BF77] to-[#7da466] p-8 text-white flex items-center">
            <h3 className="text-3xl font-semibold">Dr. {doctor.fullName}</h3>
          </div>

          {/* Doctor Information */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h4>
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-[#91BF77] mr-2" />
                <p className="text-gray-700">{doctor.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaUniversity className="text-[#91BF77] mr-2" />
                <p className="text-gray-700">{doctor.degree} from {doctor.school}</p>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Availability</h4>
              <div className="flex items-center mb-2">
                <FaClock className="text-[#91BF77] mr-2" />
                <p className="text-gray-700">Available from {doctor.startTime} to {doctor.endTime}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-[#91BF77] mr-2" />
                <p className="text-gray-700">Available on {doctor.daysAvailable.join(', ')}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaMoneyBillWave className="text-[#91BF77] mr-2" />
                <p className="text-gray-700">Consultation fees: Rs.{doctor.fees}</p>
              </div>
            </div>
          </div>

          {/* Booking Appointment Section */}
          <div className="p-8 border-t border-gray-200">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Book Appointment</h4>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <div className="mr-4">
                <p>Select Date:</p>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  filterDate={isDateAvailable}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              {selectedDate && renderTimeSlots()}
            </div>
            <button
              className="bg-[#91BF77] text-white py-2 px-4 rounded-md"
              onClick={handleAppointmentBooking}
              disabled={!selectedDate || !selectedTime}
            >
              Book Appointment
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Doctor details not found.</p>
      )}
    </div>
  );
};

export default DoctorDetails;
