import PathologistCalendar from "@/components/pathologist/Dashboard/PathologistCalendar";
import { useEffect, useState } from "react";

const PathologistDashboard = () => {
  const token = localStorage.getItem("token");

  const handleGetUserDetails = async () => {
    if (!token) {
      console.error("No token found in localStorage");
      return; 
    }
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);

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
    color: string; 
  }

  
const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    value,
    viewAllLink,
    color,
  }) => {
    return (
      <div className="bg-white rounded-lg border p-[17px] flex flex-col items-center">
        <h3 className="text-md  mb-4">{title}</h3>
        <div className="flex items-center justify-center mb-4">
          <div
            style={{ backgroundColor: color }} 
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
      <div className="flex justify-between mb-4">
        <p className="font-semibold">Goodmorning, Hardik Shrestha</p>
        <p className="font-semibold">{formattedDate}</p>
      </div>
      <div className="flex gap-4 w-full">
      <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Appointments"
              value={5}
              viewAllLink="/pathologist/appointments"
              color="#38B3A5" 
            />
            <DashboardCard
              title="Tests Pending"
              value={3}
              viewAllLink="/patient/appointmenthistory"
              color="#FF7F0E" 
            />
            <DashboardCard
              title="Lab Results"
              value={2}
              viewAllLink="/patient/labtests"
              color="#9C8DBE" 
            />
          </div>
        </div>
        <PathologistCalendar />
      </div>
    </>
  );
};

export default PathologistDashboard;
