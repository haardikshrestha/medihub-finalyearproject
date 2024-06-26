import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import axios from "axios";

interface Appointment {
  _id: string;
  patientEmail: string;
  appointmentDate: string;
  appointmentTime: string; // Keep this field to show the appointment time
  testName: string;
  status: string;
  testID: string;
}

const PathologistCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      if (!selectedDate) return;
      const response = await axios.get("http://localhost:5173/samplecollections/get/all");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderAppointments = () => {
    if (!selectedDate) return null;
    const selectedDateString = selectedDate.toISOString().slice(0, 10);
    const selectedAppointments = appointments.filter(
      (appointment) => appointment.appointmentDate === selectedDateString
    );

    if (selectedAppointments.length === 0) {
      return (
        <div className="flex items-center justify-center bg-gray-200 p-2 rounded-md mt-10">
          <span role="img" aria-label="Happy emoji">
            🙂
          </span>
          <span className="ml-2 text-sm">No appointments scheduled for the day!</span>
        </div>
      );
    }

    return selectedAppointments.map((appointment) => (
      <div key={appointment._id} className="bg-white rounded-lg border p-4 mb-4">
        <div className="text-lg font-bold flex items-center">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              appointment.status === "Test Pending" ? "bg-yellow-500" : "bg-green-500"
            }`}
          ></span>
          {appointment.testName}
        </div>
        <div className="text-sm text-gray-500">Status: {appointment.status}</div>
        <div className="text-sm text-gray-500">Time: {appointment.appointmentTime}</div>
      </div>
    ));
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
          row.push(
            <div
              key={dateString}
              className={`w-10 h-10 flex items-center justify-center text-center cursor-pointer text-sm hover:bg-gray-200 hover:rounded-full ${
                isSelected
                  ? "bg-[#91BF77] text-white rounded-full hover:bg-[#83ac6b]"
                  : ""
              }`}
              onClick={() => setSelectedDate(new Date(dateString))}
            >
              {day}
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
    <div
      className="p-4 border border-gray-200 rounded-xl h-[490px] w-[500px]"
      style={{ overflowY: "auto", height: "84.2%" }}
    >
      <div className="flex justify-between items-center mb-4">
        <div
          className="bg-gray-200 text-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-300"
          onClick={handlePrevMonth}
        >
          <BsChevronLeft />
        </div>
        <div className="text-lg font-bold">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </div>
        <div
          className="bg-gray-200  text-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-300"
          onClick={handleNextMonth}
        >
          <BsChevronRight />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">{renderCalendar()}</div>
      {selectedDate && (
        <div className="mt-4">
          <hr className="mb-4" />
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-800 mb-1">Appointments</div>
            <div className="text-md font-bold text-[#91BF77] mb-1">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="h-48 overflow-y-auto">{renderAppointments()}</div>
        </div>
      )}
    </div>
  );
};

export default PathologistCalendar;
