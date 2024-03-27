import React, { useState } from "react";

interface CarouselProps {
  startDate: Date;
}

const AppointmentCarousel: React.FC<CarouselProps> = ({ startDate }) => {
  // Initialize state for the selected date and time slot
  const [selectedDate, setSelectedDate] = useState<Date>(startDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Function to handle date navigation
  const handleDateChange = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
    setSelectedTime(null); // Reset selected time when changing date
  };

  // Function to handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time === selectedTime ? null : time);
  };

  // Function to get the day name (e.g., "Monday", "Tuesday", etc.)
  const getDayName = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  };

  // Function to get the formatted date (e.g., "March 16th")
  const getFormattedDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString(undefined, { month: "long" });
    const suffix = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
    return `${month} ${day}${suffix}`;
  };

  // Function to generate an array of time slots
  const generateTimeSlots = () => {
    const times = ["9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];
    return times.map((time) => (
      <div
        key={time}
        className={`text-center py-2 border-t border-gray-200 cursor-pointer ${
          selectedTime === time ? "bg-[#ebf7ea]" : ""
        }`}
        onClick={() => handleTimeSelect(time)}
      >
        {time}
      </div>
    ));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Full Date */}
      <div className="text-center text-lg font-semibold mb-2">
        {getFormattedDate(selectedDate)}
      </div>

      {/* Day */}
      <div className="text-center mb-2">{getDayName(selectedDate)}</div>

      {/* Time Slots */}
      <div className="border border-gray-200 rounded-md">{generateTimeSlots()}</div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleDateChange(-1)}
          className="px-4 py-2 bg-[#8AC185] text-white rounded-md"
        >
          Previous Day
        </button>
        <button
          onClick={() => handleDateChange(1)}
          className="px-4 py-2 bg-[#8AC185] text-white rounded-md"
        >
          Next Day
        </button>
      </div>
    </div>
  );
};

export default AppointmentCarousel;
