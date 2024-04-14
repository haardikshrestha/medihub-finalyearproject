import React, { useEffect, useState } from "react";
import axios from "axios";

const LabTestCard: React.FC = () => {
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

    fetchLabTests(); // Initial fetch

    const intervalId = setInterval(fetchLabTests, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-xl mb-4">All Lab Tests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labTests.map((test) => (
          <div key={test._id} className="bg-white rounded-lg  p-4 border">
            <h2 className="text-lg font-semibold mb-2">{test.testName}</h2>
            <p className="text-gray-600 mb-2">Price: Rs.{test.testPrice}</p>
            <ul className="list-disc pl-5">
              {test.testFields.map((field: string, index: number) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTestCard;
