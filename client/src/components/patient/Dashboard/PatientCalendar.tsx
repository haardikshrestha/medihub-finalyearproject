import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Treatment {
  title: string;
  description: string;
}

const PatientCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const treatments: { [date: string]: Treatment[] } = {
    // Treatments data
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
      className="p-4 border border-gray-200 rounded-xl h-[490px] w-[465px]"
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
            <div className="text-sm font-semibold text-gray-800 mb-1">Your Schedule</div>
            <div className="text-md font-bold text-[#91BF77] mb-1">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="h-48 overflow-y-auto ">
            <div className="flex flex-col gap-4 mt-3">
              <div className="bg-white rounded-lg  p-4 border">
                <div className="text-lg font-bold">Blood Test</div>
                <div className="text-sm text-gray-500">
                  Routine blood test for cholesterol levels.
                </div>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <div className="text-lg font-bold">X-Ray</div>
                <div className="text-sm text-gray-500">
                  X-Ray scan for the knee joint.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientCalendar;
