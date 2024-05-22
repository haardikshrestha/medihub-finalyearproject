import { useState } from "react";
import AppointmentsTable from "./AppointmentsTable";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

const AppointentsContainer = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full mx-auto">
      <div className="relative bg-white rounded-lg  overflow-hidden">
        <div className="">
          <AppointmentsTable />
        </div>
      </div>
    </div>
  );
};

export default AppointentsContainer;
