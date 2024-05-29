import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import axios from "axios";

interface SampleCollection {
  _id: string;
  appointmentDate: string;
  testName: string;
  status: string;
  testID: string;
}

interface Appointment {
  _id: string;
  apptID: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptReason: string;
  apptStatus: string;
  __v: number;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [sampleCollections, setSampleCollections] = useState<SampleCollection[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      if (!selectedDate) return;
      const doctorEmail = localStorage.getItem("email"); 

      const appointmentResponse = await axios.get(
        `http://localhost:5173/getappointments`,
      );
      const filteredAppointments = appointmentResponse.data.filter(
        (appointment: Appointment) => appointment.apptDoctor === doctorEmail,
      );
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          const currentDateValue = new Date(dateString);
          const isCurrentDay =
            currentDateValue.toDateString() === new Date().toDateString();
          const isSelected =
            selectedDate?.toDateString() === currentDateValue.toDateString();
          const hasSampleData = sampleCollections.some(
            (item) =>
              new Date(item.appointmentDate).toDateString() ===
              currentDateValue.toDateString(),
          );
          const hasAppointment = appointments.some(
            (item) =>
              new Date(item.apptDate).toDateString() === currentDateValue.toDateString(),
          );
          row.push(
            <div
              key={dateString}
              className={`w-10 h-10 flex items-center justify-center text-center cursor-pointer text-sm relative ${
                isSelected
                  ? "bg-[#91BF77] text-white rounded-full hover:bg-[#83ac6b]"
                  : isCurrentDay
                  ? "bg-gray-200 text-gray-600 rounded-full"
                  : "hover:bg-gray-200 hover:rounded-full"
              }`}
              onClick={() => setSelectedDate(currentDateValue)}
            >
              <div className="z-10 relative">{day}</div>
              {isSelected && (hasSampleData || hasAppointment) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-transparent border-2 border-amber-300 rounded-full"></div>
                </div>
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
    <div
      className="p-4 border border-gray-200 rounded-xl h-[550px] w-[340px]"
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
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
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
          <div className="h-48 overflow-y-auto">
            <div className="flex flex-col gap-4 mt-3">
              {sampleCollections
                .filter(
                  (item) =>
                    new Date(item.appointmentDate).toDateString() ===
                    selectedDate.toDateString(),
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border p-4 flex items-center relative"
                  >
                    <div
                      className={`bg-green-100 text-green-700 p-2 rounded-full mr-4 ${
                        item.status === "Test Completed" ? "bg-green-500 text-white" : ""
                      }`}
                    >
                      <span role="img" aria-label="Test">
                        🧪
                      </span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{item.testName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        {item.status}
                        {item.status === "Pending" && (
                          <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full ml-2">
                            Pending
                          </div>
                        )}
                        {item.status === "Completed" && (
                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">
                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              {appointments
                .filter(
                  (item) =>
                    new Date(item.apptDate).toDateString() ===
                    selectedDate.toDateString(),
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border p-4 flex items-center relative"
                  >
                    <div
                      className={`bg-blue-100 text-blue-700 p-2 rounded-full mr-4 ${
                        item.apptStatus === "Test Completed"
                          ? "bg-green-500 text-white"
                          : item.apptStatus === "Pending"
                          ? "bg-yellow-500 text-white"
                          : ""
                      }`}
                    >
                      <span role="img" aria-label="Appointment">
                        📅
                      </span>
                    </div>
                    <div>
                      <div className="text-lg font-bold">Appointment</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        {item.apptPatient}
                      </div>
                      {item.apptStatus === "Pending" && (
                        <div className="text-sm text-yellow-500">Pending</div>
                      )}
                    </div>
                  </div>
                ))}

              {sampleCollections.filter(
                (item) =>
                  new Date(item.appointmentDate).toDateString() ===
                  selectedDate.toDateString(),
              ).length === 0 &&
                appointments.filter(
                  (item) =>
                    new Date(item.apptDate).toDateString() ===
                    selectedDate.toDateString(),
                ).length === 0 && (
                  <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md mt-10">
                    <span role="img" aria-label="Smiling face">
                      🙂
                    </span>
                    <span className="ml-2 text-sm font-medium">
                      You have no scheduled events for this day!
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
