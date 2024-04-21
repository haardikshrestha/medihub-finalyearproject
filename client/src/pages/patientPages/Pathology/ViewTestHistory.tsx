import PathologyAppointmentCard from "@/components/patient/Pathology/PathologyAppointmentCard";

const ViewTestHistory = () => {
  return (
    <>
      <div>
        <h3>Your lab test appointment history:</h3>
      </div>
      <div>
        <PathologyAppointmentCard />
      </div>
    </>
  );
};

export default ViewTestHistory;
