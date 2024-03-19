import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Appointment {
  title: string;
  time: string;
  doctor: string;
}

interface Treatment {
  title: string;
  description: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const appointments: { [date: string]: Appointment[] } = {
    "2020-12-10": [
      { title: "Pulmonologist", time: "9:00-10:00", doctor: "Dr. Cameron Williamson" },
      { title: "Dentist", time: "15:00-15:30", doctor: "Dr. Diane Russell" },
    ],
  };

  const treatments: { [date: string]: Treatment[] } = {
    "2020-12-10": [{ title: "Antibiotic", description: "1 tablet after a meal" }],
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
          row.push(
            <div
              key={dateString}
              className={`w-10 h-10 flex items-center justify-center text-center cursor-pointer text-sm hover:bg-gray-200 hover:rounded-full ${
                isSelected
                  ? "bg-[#91BF77] text-white rounded-full hover:bg-[#91BF77]"
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
    <div className="p-4 border border-gray-200 rounded-xl ml-6">
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
          className="bg-gray-200 text-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-300"
          onClick={handleNextMonth}
        >
          <BsChevronRight />
        </div>
      </div>
      {renderCalendar()}
      {selectedDate && (
        <div className="mt-4">
          <hr className="mb-4" />
          <div className="text-lg font-bold mb-2">Your appointments</div>
          {appointments[selectedDate.toISOString().split("T")[0]]?.map(
            (appointment, index) => (
              <div key={index} className="bg-blue-100 p-2 rounded mb-2">
                <div>{appointment.title}</div>
                <div className="text-sm text-gray-500">{appointment.time}</div>
                <div className="text-sm text-gray-500">Dr. {appointment.doctor}</div>
              </div>
            ),
          ) || <div>No appointments for this date.</div>}
          <div className="text-lg font-bold mb-2 mt-4">Your treatment</div>
          {treatments[selectedDate.toISOString().split("T")[0]]?.map(
            (treatment, index) => (
              <div key={index} className="bg-green-100 p-2 rounded mb-2">
                <div>{treatment.title}</div>
                <div className="text-sm text-gray-500">{treatment.description}</div>
              </div>
            ),
          ) || <div>No treatments for this date.</div>}
        </div>
      )}
    </div>
  );
};

export default Calendar;
