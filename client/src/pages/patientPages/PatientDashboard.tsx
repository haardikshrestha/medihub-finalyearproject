import LatestAppointment from "@/components/patient/Dashboard/LatestAppointment";
import LatestTestResults from "@/components/patient/Dashboard/LatestTestResults";
import PatientCalendar from "@/components/patient/Dashboard/PatientCalendar";
import { useState, useEffect } from "react";

const PatientDetails: React.FC = () => {
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

  interface DashboardCardProps {
    title: string;
    value: number;
    viewAllLink: string;
    color: string; // Adding a color prop
  }

  
const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    value,
    viewAllLink,
    color, // Accessing the color prop
  }) => {
    return (
      <div className="bg-white rounded-lg border p-[17px] flex flex-col items-center">
        <h3 className="text-md  mb-4">{title}</h3>
        <div className="flex items-center justify-center mb-4">
          <div
            style={{ backgroundColor: color }} // Setting background color dynamically
            className="rounded-full h-16 w-16 flex items-center justify-center text-white"
          >
            <span className="text-xl font-bold">{value}</span>
          </div>
        </div>
        <a href={viewAllLink} className="text-gray-500 text-sm hover:text-gray-700 font-semibold hover:underline">
          View All
        </a>
      </div>
    );
  };
  return (
    <>
      <div className="mb-5 flex justify-between">
        <p className="font-bold">Goodmorning, Hardik!</p>
        <p className="font-bold">{formattedDate}</p>
      </div>
      <div className="flex gap-5">
        <PatientCalendar />
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Medication"
              value={5}
              viewAllLink="/patient/medications"
              color="#91BF77" // Assigning hexadecimal color value
            />
            <DashboardCard
              title="Appointments"
              value={3}
              viewAllLink="/patient/appointmenthistory"
              color="#F6AD55" // Assigning a different hexadecimal color value
            />
            <DashboardCard
              title="Lab Results"
              value={2}
              viewAllLink="/patient/labtests"
              color="#4299E1" // Assigning another hexadecimal color value
            />
          </div>
          <LatestAppointment />
          <LatestTestResults />
        </div>
      </div>
    </>
  );
};

export default PatientDetails;
