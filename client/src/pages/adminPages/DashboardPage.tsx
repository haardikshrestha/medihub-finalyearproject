import Card from "@/components/admin/Card";
import Gender from "@/components/admin/charts/GenderStats";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPage = () => {
  const [info, setInfo] = useState({
    departments: 0,
    doctors: 0,
    pathologists: 0,
    patients: 0,
    wards: 0,
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
    <div>
      <ToastContainer /> 
      <div className="flex flex-row justify-between">
        <Card
          number={info.patients} 
          title="Patients"
          imageUrl="src/assets/admin-images/patient.png"
        />
        <Card
          number={info.doctors} 
          title="Doctors"
          imageUrl="src/assets/admin-images/doctor.png"
        />
        <Card
          number={info.pathologists} 
          title="Pathologists"
          imageUrl="src/assets/admin-images/pathologist.png"
        />
        <Card
          number={info.departments}  
          title="Departments"
          imageUrl="src/assets/admin-images/department.png"
        />
        <Card
          number={info.wards}  
          title="Wards"
          imageUrl="src/assets/admin-images/ward.png"
        />
      </div>
      <div className="mt-6">
      <Gender/>
      </div>
      
    </div>
  );
};

export default DashboardPage;
