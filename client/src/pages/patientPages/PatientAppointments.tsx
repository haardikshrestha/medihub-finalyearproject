import { useNavigate } from "react-router-dom";

const departments = [
  { name: "Cardiology", icon: "/src/assets/hospital-images/heart-rate.png" },
  { name: "Orthopedics", icon: "/src/assets/hospital-images/bone.png" },
  { name: "Neurology", icon: "/src/assets/hospital-images/nerve.png" },
  { name: "Dermatology", icon: "/src/assets/hospital-images/skin.png" },
  { name: "Ophthalmology", icon: "/src/assets/hospital-images/eye.png" },
  { name: "Gynecology", icon: "/src/assets/hospital-images/fertility.png" },
  { name: "ENT", icon: "/src/assets/hospital-images/ent.png" },
  { name: "Urology", icon: "/src/assets/hospital-images/kidneys.png" },
  { name: "Pediatrics", icon: "/src/assets/hospital-images/baby.png" },
  { name: "Psychiatry", icon: "/src/assets/hospital-images/brain.png" },
];

const PatientAppointments = () => {
  const navigate = useNavigate();
  const navigator = (departmentName: string) => {
    navigate(`/patient/adoctors?department=${departmentName}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto items-center justify-center">
      {departments.map((department, index) => (
        <div
          key={index}
          className="max-w-xs bg-gray-100 border border-gray-200 rounded-lg overflow-hidden my-2 flex flex-col justify-between"
        >
          <div className="flex items-center justify-center h-28 bg-gray-100">
            <img
              src={department.icon}
              alt={`${department.name} Icon`}
              className="h-20 w-20 text-gray-700"
            />
          </div>
          <div className="py-4 px-4 flex flex-col items-center bg-white">
            <h2 className="text-center text-gray-700 font-medium text-lg mb-2">
              {department.name}
            </h2>
            <button
              type="submit"
              className="bg-lime-400 hover:bg-lime-500 text-white text-sm py-2 px-4 rounded-full w-2/3 self-center"
              onClick={() => navigator(department.name)}
            >
              Check
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientAppointments;
