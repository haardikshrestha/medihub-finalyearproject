import PhotoUpload from "@/components/admin/PhotoUpload";
import PathologistTable from "@/components/admin/crud/Pathology/PathologistTable";

const PathologistsPage = () => {
  return (
    <div>
      <PhotoUpload/>
      <PathologistTable />
    </div>
  );
};

export default PathologistsPage;
