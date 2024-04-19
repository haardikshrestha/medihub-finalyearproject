import LatestAppointment from "@/components/patient/Dashboard/LatestAppointment";
import LatestTestResults from "@/components/patient/Dashboard/LatestTestResults";
import PatientCalendar from "@/components/patient/Dashboard/PatientCalendar";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PatientDetails: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      setGreeting(getGreeting());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []); 

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getGreeting = () => {
    const currentHour = currentDate.getHours();
    let greetingMessage = "";

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingMessage = "Good afternoon";
    } else {
      greetingMessage = "Good evening";
    }

    return greetingMessage;
  };

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
        <a
          href={viewAllLink}
          className="text-gray-500 text-sm hover:text-gray-700 font-semibold hover:underline"
        >
          View All
        </a>
      </div>
    );
  };

  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`http://localhost:5173/patients/${email}`)
        .then((response) => {
          const { firstName } = response.data;
          setPatientName(`${firstName}`);
        })
        .catch((error) => {
          console.error("Error fetching patient details:", error);
        });
    } else {
      console.error("Email not found in localStorage");
    }
  }, []);

  return (
    <>
      <ToastContainer className={"mt-14"} />
      <div className="mb-5 flex justify-between">
        <p className="font-bold">{greeting}, {patientName}!</p>
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
              color="#91BF77"
            />
            <DashboardCard
              title="Appointments"
              value={3}
              viewAllLink="/patient/appointmenthistory"
              color="#F6AD55"
            />
            <DashboardCard
              title="Lab Results"
              value={2}
              viewAllLink="/patient/labtests"
              color="#4299E1"
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
