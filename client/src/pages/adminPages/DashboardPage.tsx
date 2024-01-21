import Card from "@/components/admin/Card";

const DashboardPage = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Card
          number="2"
          title="Patients"
          imageUrl="src/assets/admin-images/patient.png"
        />
        <Card number="7" title="Doctors" imageUrl="src/assets/admin-images/doctor.png" />
        <Card
          number="4"
          title="Pathologists"
          imageUrl="src/assets/admin-images/pathologist.png"
        />
        <Card
          number="10"
          title="Departments"
          imageUrl="src/assets/admin-images/department.png"
        />
        <Card number="6" title="Wards" imageUrl="src/assets/admin-images/ward.png" />
      </div>
    </div>
  );
};

export default DashboardPage;
