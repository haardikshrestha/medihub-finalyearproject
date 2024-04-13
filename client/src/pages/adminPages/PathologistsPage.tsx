import { Link } from "react-router-dom";
import PathologistTable from "@/components/admin/crud/Pathology/PathologistTable";
import { useEffect, useState } from "react";
import axios from "axios";

const PathologistsPage = () => {
  const [labTests, setLabTests] = useState<any[]>([]);

  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        const response = await axios.get("http://localhost:5173/get/labtests");
        setLabTests(response.data);
      } catch (error) {
        console.error("Error fetching lab tests:", error);
      }
    };

    fetchLabTests(); 

    const intervalId = setInterval(fetchLabTests, 30000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="container mx-auto">
      <div className=" mb-6 bg-gradient-to-r from-[#91BF77] to-[#7da466] text-white p-6 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4">
            {labTests.length}
          </div>
          <div className="text-2xl font-bold">Lab Tests</div>
        </div>
        <Link to="/admin/labtests">
          <button className="bg-white text-gray-800 px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-900 hover:shadow-lg">
            View
          </button>
        </Link>
      </div>

      <PathologistTable />
    </div>
  );
};

export default PathologistsPage;
