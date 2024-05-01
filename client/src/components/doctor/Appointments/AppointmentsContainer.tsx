import { useState } from "react";
import AppointmentsTable from "./AppointmentsTable";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

const AppointentsContainer = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full mx-auto">
      <div className="relative bg-white rounded-lg  overflow-hidden">
        <div className="flex  border-gray-200">
          <div
            className={`p-4 flex items-center cursor-pointer border-r ${
              activeTab === "all" ? "bg-[#91BF77] text-white" : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("all")}
          >
            {activeTab === "all" ? <FaFolderOpen className="mr-2" /> : <FaFolder className="mr-2" />}
            All
          </div>
          <div
            className={`p-4 flex items-center cursor-pointer border-r ${
              activeTab === "today" ? "bg-[#91BF77] text-white" : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("today")}
          >
            {activeTab === "today" ? <FaFolderOpen className="mr-2" /> : <FaFolder className="mr-2" />}
            Today
          </div>
          <div
            className={`p-4 flex items-center cursor-pointer rounded-tr-lg ${
              activeTab === "completed" ? "bg-[#91BF77] text-white" : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            {activeTab === "completed" ? <FaFolderOpen className="mr-2" /> : <FaFolder className="mr-2" />}
            Completed
          </div>
        </div>
        <div className="">
          <AppointmentsTable />
        </div>
      </div>
    </div>
  );
};

export default AppointentsContainer;
