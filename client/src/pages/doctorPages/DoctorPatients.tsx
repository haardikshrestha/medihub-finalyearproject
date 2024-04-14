import Patients from "@/components/doctor/Patients";
import InPatientList from "@/components/doctor/Patients/InPatients";

const DoctorPatients = () => {
  return (
    <>
      <div>
         <Patients/>
         <InPatientList/>
      </div>
    </>
  );
};

export default DoctorPatients;
