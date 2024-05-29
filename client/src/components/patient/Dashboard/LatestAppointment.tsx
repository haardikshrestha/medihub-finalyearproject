import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUserMd, FaRegClock } from "react-icons/fa";

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

const LatestAppointment: React.FC = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestAppointment = async () => {
      try {
        const userEmail = localStorage.getItem("email"); 

        const response = await axios.get<Appointment[]>(
          `http://localhost:5173/getappointments?email=${userEmail}`
        );
        const now = new Date();

        const futureAppointments = response.data.filter(
          (appointment) => new Date(appointment.apptDate) > now,
        );

        if (futureAppointments.length > 0) {
          const latestAppointment = futureAppointments[0]; 
          setAppointment(latestAppointment);

          const appointmentDate = new Date(latestAppointment.apptDate);
          const daysLeft = Math.ceil(
            (appointmentDate.getTime() - now.getTime()) / (1000 * 3600 * 24),
          );
          setDaysLeft(daysLeft);
        } else {
          setAppointment(null);
        }
      } catch (error) {
        console.error("Error fetching latest appointment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestAppointment();
  }, []);

  const handleCalendarIconClick = () => {
    navigate("/patient/appointmenthistory");
  };

  return (
    <div className="bg-white rounded-lg border p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointment</h2>
        <FaCalendarAlt
          className="text-green-500 text-2xl cursor-pointer"
          onClick={handleCalendarIconClick}
        />
      </div>
      <div className="bg-gray-100 rounded-lg p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {appointment ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <div className="flex items-center mb-2">
                    <FaUserMd className="text-gray-600 text-xl mr-2 md:mr-4" />
                    <p className="text-gray-700">Dr. {appointment.apptDoctor}</p>
                  </div>
                  <div className="flex items-center">
                    <FaRegClock className="text-gray-600 text-xl mr-2 md:mr-4" />
                    <p className="text-gray-700">
                      {new Date(appointment.apptDate).toLocaleDateString()} -{" "}
                      {appointment.apptTime}
                    </p>
                  </div>
                </div>
                {daysLeft !== null && (
                  <div className="flex items-center">
                    <div className="flex flex-col items-center justify-center p-2 bg-[#91BF77] rounded-md">
                      <p className="text-white text-xs">Days Left</p>
                      <p className="text-white text-lg font-semibold ">{daysLeft}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center w-full">
                <p className="text-gray-600 font-semibold">No appointments scheduled.</p>
                <Link to="/patient/appointments">
                  <button className="bg-[#91BF77] text-white px-4 py-2 rounded mt-3 hover:bg-[#7da466]">
                    Schedule Appointment
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LatestAppointment;
