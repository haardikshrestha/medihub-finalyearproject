import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaClock,
  FaCalendarAlt,
  FaUniversity,
  FaMoneyBillWave,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
  const [apptReason, setApptReason] = useState<string>(""); // State for appointment reason
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams(location.search);
        const email = params.get("email");
        if (!email) {
          throw new Error("Email parameter is missing");
        }
        const response = await axios.get(
          `http://localhost:5173/getdoctorbyemail/${email}`,
        );
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
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
    const dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dayOfWeek];
    return daysAvailable.includes(dayName);
  };

  const getTimeSlotsForSelectedDate = () => {
    if (!selectedDate || !doctor || !doctor.startTime || !doctor.endTime) return [];

    // Parse start and end time strings
    const startTimeParts = doctor.startTime.split(":");
    const startHours = parseInt(startTimeParts[0]);
    const startMinutes = parseInt(startTimeParts[1].split(" ")[0]);
    const startAmPm = startTimeParts[1].split(" ")[1];

    const endTimeParts = doctor.endTime.split(":");
    const endHours = parseInt(endTimeParts[0]);
    const endMinutes = parseInt(endTimeParts[1].split(" ")[0]);
    const endAmPm = endTimeParts[1].split(" ")[1];

    // Convert 12-hour format to 24-hour format
    const startHours24 =
      startAmPm === "PM" && startHours !== 12
        ? startHours + 12
        : startAmPm === "AM" && startHours === 12
        ? 0
        : startHours;
    const endHours24 =
      endAmPm === "PM" && endHours !== 12
        ? endHours + 12
        : endAmPm === "AM" && endHours === 12
        ? 0
        : endHours;

    // Construct Date objects with dummy date (January 1, 1970)
    const startTime = new Date(1970, 0, 1, startHours24, startMinutes);
    const endTime = new Date(1970, 0, 1, endHours24, endMinutes);

    console.log("start is", startTime);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      console.error("Invalid time format");
      return [];
    }

    const timeSlots = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      timeSlots.push(formattedTime);

      currentTime.setMinutes(currentTime.getMinutes() + 20);
    }

    const groupedTimeSlots = [];
    for (let i = 0; i < timeSlots.length; i += 4) {
      groupedTimeSlots.push(timeSlots.slice(i, i + 4));
    }

    return groupedTimeSlots;
  };

  const renderTimeSlots = () => {
    const timeSlots = getTimeSlotsForSelectedDate();
    return (
      <div className="mb-4">
        <p className="text-gray-800 font-semibold mb-2">Select Time:</p>
        {timeSlots.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2 mb-2">
            {row.map((timeSlot, index) => (
              <button
                key={`${rowIndex}-${index}`}
                className={`px-3 py-2 rounded-md text-sm font-semibold ${
                  selectedTime === timeSlot
                    ? "bg-[#91BF77] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => handleTimeChange(timeSlot)}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        ))}
        {selectedTime && (
          <div className="mt-4 flex items-center">
            <FaClock className="text-[#91BF77] mr-2" />
            <p className="text-gray-700">Your selected time: {selectedTime}</p>
          </div>
        )}
      </div>
    );
  };

  const handleAppointmentBooking = async () => {
    try {
      const patientEmail = localStorage.getItem("email");
      if (!patientEmail) {
        throw new Error("Patient email not found in localStorage");
      }

      const response = await axios.post<any, { data: any }>(
        "http://localhost:5173/post/doctor/appointment",
        {
          apptDate: selectedDate?.toISOString(),
          apptPatient: patientEmail,
          apptDoctor: doctor?.email,
          apptTime: selectedTime,
          apptReason: apptReason,
        }
      );

      console.log("Appointment booked successfully:", response.data);
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment: " + error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();

    const calendar = [];
    let day = 1;

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    calendar.push(
      <div key="weekdays" className="flex mb-2">
        {weekDays.map((weekday) => (
          <div key={weekday} className="w-10 text-center text-gray-500 text-sm">
            {weekday}
          </div>
        ))}
      </div>,
    );

    for (let week = 0; week < 6; week++) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        if (week === 0 && i < startDay) {
          row.push(
            <div key={`empty-${i}`} className="w-10 text-gray-400">
              {" "}
            </div>,
          );
        } else if (day > daysInMonth) {
          row.push(
            <div key={`empty-${week * 7 + i}`} className="w-10 text-gray-400">
              {" "}
            </div>,
          );
        } else {
          const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          const isSelected =
            selectedDate?.toDateString() === new Date(dateString).toDateString();
          const isAvailable = isDateAvailable(new Date(dateString)); // Check if the date is available
          row.push(
            <div
              key={dateString}
              className={`w-10 h-10 flex items-center justify-center text-center cursor-pointer text-sm ${
                isSelected
                  ? "bg-[#91BF77] text-white rounded-full"
                  : isAvailable
                  ? "hover:bg-gray-200 rounded-full"
                  : "text-gray-400"
              }`}
              onClick={() => isAvailable && setSelectedDate(new Date(dateString))} // Only allow selection if available
            >
              {isAvailable ? (
                day
              ) : (
                <span className="block text-center w-4 h-4 bg-gray-400 rounded-full"></span>
              )}
            </div>,
          );
          day++;
        }
      }
      calendar.push(
        <div key={`week-${week}`} className="flex">
          {row}
        </div>,
      );
    }

    return calendar;
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-full">
        {isLoading ? (
          <p className="text-center text-gray-600">Loading doctor details...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : doctor ? (
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-gradient-to-r from-[#91BF77] to-[#7da466] p-8 text-white flex items-center">
              <h3 className="text-3xl font-semibold">Dr. {doctor.fullName}</h3>
            </div>

            {/* Doctor Information */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                  Contact Information
                </h4>
                <div className="flex items-center mb-2">
                  <FaEnvelope className="text-[#91BF77] mr-2" />
                  <p className="text-gray-700">{doctor.email}</p>
                </div>
                <div className="flex items-center mb-2">
                  <FaUniversity className="text-[#91BF77] mr-2" />
                  <p className="text-gray-700">
                    {doctor.degree} from {doctor.school}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                  Availability
                </h4>
                <div className="flex items-center mb-2">
                  <FaClock className="text-[#91BF77] mr-2" />
                  <p className="text-gray-700">
                    Available from {doctor.startTime} to {doctor.endTime}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-[#91BF77] mr-2" />
                  <p className="text-gray-700">
                    Available on {doctor.daysAvailable.join(", ")}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FaMoneyBillWave className="text-[#91BF77] mr-2" />
                  <p className="text-gray-700">Consultation fees: Rs.{doctor.fees}</p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-200">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                Book Appointment
              </h4>

              <div className="flex">
                <div className="w-2/5">
                  <div className="bg-white rounded-xl border p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div
                        className="text-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-200"
                        onClick={handlePrevMonth}
                      >
                        <BsChevronLeft />
                      </div>
                      <div className="text-lg font-semibold">
                        {currentDate.toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div
                        className="text-gray-500 p-2 rounded-full cursor-pointer hover:bg-gray-200"
                        onClick={handleNextMonth}
                      >
                        <BsChevronRight />
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg h-[265px] overflow-y-auto">
                      {renderCalendar()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full ml-10 gap-3">
                  <div className="">
                    <p className="text-gray-800 font-semibold mb-2">Selected Date:</p>
                    <div className="flex">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        filterDate={isDateAvailable}
                        dateFormat="yyyy-MM-dd"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  {selectedDate && renderTimeSlots()}
                  {/* Input field for appointment reason */}
                  <input
                    type="text"
                    placeholder="Appointment Reason"
                    value={apptReason}
                    onChange={(e) => setApptReason(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    className="bg-[#91BF77] text-white py-2 px-4 rounded-md mt-2 hover:bg-[#91BF77] transition-colors duration-300"
                    onClick={handleAppointmentBooking}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Doctor details not found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;
