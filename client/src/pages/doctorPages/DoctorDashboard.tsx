import Calendar from "@/components/doctor/Calendar";
import StatsCard from "@/components/doctor/Dashboard/StatsCard";
import Events from "@/components/doctor/Events";
import { useState, useEffect } from "react";
import PatientDashboard from "@/components/doctor/Patients/PatientDashboard";
import Attendance from "@/components/doctor/Patients/GenderStats";
import Gender from "@/components/doctor/Patients/GenderStats";
import AppointmentCard from "@/components/doctor/Dashboard/AppointmentCard";

const DoctorDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/numberOfData");
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // July 8th, 2022

  const genderData = {
    male: 30,
    female: 40,
    others: 5,
    total: 75,
  };

  return (
    <>
      <div className="flex justify-between font-semibold px-4">
        <p>{`${greeting}, Dr. John Doe`}</p>
        <p>{formattedDate}</p>
      </div>

      
        <div className="flex flex-row space-x-5 p-4">
          <div>
            {/* stats div */}
            <div className=" flex flex-row gap-5">
              <StatsCard
                color="blue"
                title="Appointments"
                number={784}
                percentage="+41%"
              />
              <StatsCard
                color="red"
                title="Total Patients"
                number={784}
                percentage="+41%"
              />
              <StatsCard
                color="green"
                title="Total Earnings"
                number={784}
                percentage="+41%"
              />
            </div>

            <div className=" mt-4 flex gap-4">
              {/* gender div */}
              <Gender />
              <div className="ml-[5px] flex-1">
                <AppointmentCard />
              </div>
            </div>
          </div>
          <div className="">
            <div style={{ height: "calc(100% - 30px)" }}>
              <Calendar />
            </div>
          </div>
        </div>
      
      {/* <Events/>
      <PatientDashboard/> */}
    </>
  );
};

export default DoctorDashboard;
