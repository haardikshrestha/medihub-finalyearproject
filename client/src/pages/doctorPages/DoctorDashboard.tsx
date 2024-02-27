import DoctorGreeting from "@/components/doctor/DoctorGreeting";

const DoctorDashboard = () => {
  return (
    <>
      <div className="flex justify-between font-semibold">
        <p>Goodmorning, Dr. John Doe</p>
        <p>22nd February, 2024</p>
      </div>

      <div className="mt-5 flex ">
        <div className="bg-gray-200 p-5 rounded-xl">
          <p className="text-2xl font-bold flex justify-center">7</p>
          <p className="text-sm">Appointments Today</p>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
