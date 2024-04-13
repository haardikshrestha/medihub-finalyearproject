import BackButton from "@/components/BackButton";
import LabTestCard from "@/components/admin/pathology/LabTestCard";
import LabTestForm from "@/components/admin/pathology/LabTestForm";

const LabTestsPage = () => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <BackButton/>
        <LabTestForm />
      </div>

      <div>
        <LabTestCard />
      </div>
    </div>
  );
};

export default LabTestsPage;
