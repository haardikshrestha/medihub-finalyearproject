import Card from "@/components/admin/Card";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [info, setInfo] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalPathologists: 0,
    totalDepartments: 0,
    totalWards: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/getNumberInfo");
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
      <div className="flex flex-row justify-between">
        <Card
          number={info.totalPatients}
          title="Patients"
          imageUrl="src/assets/admin-images/patient.png"
        />
        <Card
          number={info.totalDoctors}
          title="Doctors"
          imageUrl="src/assets/admin-images/doctor.png"
        />
        <Card
          number={info.totalPathologists}
          title="Pathologists"
          imageUrl="src/assets/admin-images/pathologist.png"
        />
        <Card
          number={info.totalDepartments}
          title="Departments"
          imageUrl="src/assets/admin-images/department.png"
        />
        <Card
          number={info.totalWards}
          title="Wards"
          imageUrl="src/assets/admin-images/ward.png"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
