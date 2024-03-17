import { useState, useEffect } from "react";

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
  }, []);

  return (
    <>
      <div className="flex justify-between font-semibold">
        <p>{`${greeting}, Dr. John Doe`}</p>
        <p>{formattedDate}</p>
      </div>

      <div className="flex flex-row gap-5">
        <div className="mt-5 flex">
          <div className="bg-gray-200 p-5 rounded-xl w-48">
            <p className="text-2xl font-bold flex justify-center">{info.appointments}</p>
            <p className="mt-2 flex justify-center text-sm">Appointments Today</p>
          </div>
        </div>
        <div className="mt-5 flex">
          <div className="bg-gray-200 p-5 rounded-xl w-48">
            <p className="text-2xl font-bold flex justify-center">{info.patients}</p>
            <p className=" mt-2 text-sm flex justify-center">Total Patients</p>
          </div>
        </div>
        <div className="mt-5 flex">
          <div className="bg-gray-200 p-5 rounded-xl w-48">
            <p className="text-2xl font-bold flex justify-center">रु. 100</p>
            <p className=" mt-2 text-sm flex justify-center">Total Earnings</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
