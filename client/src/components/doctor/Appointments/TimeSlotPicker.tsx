import React, { useState } from "react";

interface TimeSlot {
  time: string;
  isSelected: boolean;
}

const TimeSlotPicker: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { time: "9:00 AM", isSelected: false },
    { time: "9:10 AM", isSelected: false },
    { time: "9:20 AM", isSelected: false },
    { time: "9:30 AM", isSelected: false },
    { time: "9:40 AM", isSelected: false },
    { time: "9:50 AM", isSelected: false },
    { time: "10:00 AM", isSelected: false },
    { time: "10:10 AM", isSelected: true },
    { time: "10:20 AM", isSelected: false },
    { time: "10:30 AM", isSelected: false },
  ]);

  const handleTimeSlotClick = (index: number) => {
    const updatedTimeSlots = timeSlots.map((slot, i) =>
      i === index ? { ...slot, isSelected: true } : { ...slot, isSelected: false },
    );
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold">Morning</h2>
        <span className="text-sm text-gray-500 ml-auto">9:00 AM to 12:00 PM</span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md ${
              slot.isSelected
                ? "bg-[#91BF77] text-white flex items-center justify-center"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTimeSlotClick(index)}
          >
            {slot.isSelected && <span className="mr-2">➤</span>}
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
