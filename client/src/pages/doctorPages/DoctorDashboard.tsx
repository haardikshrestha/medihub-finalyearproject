import Calendar from "@/components/doctor/Calendar";
import StatsCard from "@/components/doctor/Dashboard/StatsCard";
import { useState, useEffect } from "react";
import AppointmentCard from "@/components/doctor/Dashboard/AppointmentCard";
import DiagnosisList from "./DiagnosisDoctor";
import DiagnosisCard from "./DiagnosisDoctor";

const DoctorDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointmentCount, setAppointmentCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      try {
        const currentDateString = currentDate.toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:5173/getappointmentsbydate?date=${currentDateString}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointment count");
        }

        const appointments = await response.json();
        setAppointmentCount(appointments.length);
      } catch (error) {
        console.error("Error fetching appointment count:", error);
        setAppointmentCount(null);
      }
    };

    fetchAppointmentCount();
  }, [currentDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const currentHour = currentDate.getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const [info, setInfo] = useState({
    departments: 0,
    doctors: 0,
    pathologists: 0,
    patients: 0,
    wards: 0,
    appointments: 0,
  });


  return (
    <>
      <div className="flex justify-between font-semibold px-4">
        <p>{`${greeting}, Dr. John Doe`}</p>
        <p>{formattedDate}</p>
      </div>
      <div className="flex flex-row space-x-5 p-4">
        <div>
          <div className=" flex flex-row gap-5">
            <StatsCard
              color="blue"
              title="Appointments"
              number={appointmentCount}
            />
            <StatsCard color="red" title="Lab Tests" number={11} />
            <StatsCard color="green" title="Diagnosis" number={4} />
          </div>
          <div className=" mt-4 flex gap-4">
            <div className="ml-[5px] flex-1">
              {/* <AppointmentCard /> */}
            </div>
          </div>
        </div>
        <div className="">
          <div style={{ height: "calc(100% - 30px)" }}>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;