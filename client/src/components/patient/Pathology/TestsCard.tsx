import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch } from "react-icons/fa";

interface LabTest {
  _id: string;
  testName: string;
  testPrice: number;
  testFields: { fieldName: string; normalRange: string }[];
}

const LabTestCard: React.FC = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLabTests = labTests.filter((test) =>
    test.testName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-8 text-center text-gray-800">
        Schedule Lab Test
      </h1>
      <form className="relative mb-4 mt-0 flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full py-3 pl-10 pr-4 text-sm border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search Lab Tests"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredLabTests.map((test) => (
          <div
            key={test._id}
            className="bg-white rounded-lg  overflow-hidden border flex flex-col"
          >
            <div className="p-6 flex-grow">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                {test.testName}
              </h2>
              <p className="text-gray-600 mb-4">Price: Rs.{test.testPrice}</p>
              <ul className="list-disc pl-4 mb-4 text-gray-600">
                {test.testFields.map((field, index) => (
                  <li key={index}>
                    {field.fieldName}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mb-4">
              <Link
                to={`/patient/testdetails?id=${test._id}`}
                className="bg-[#91BF77]  hover:bg-[#7da466] text-white py-2 px-4 rounded-full flex items-center justify-center transition duration-300 w-[100px]"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabTestCard;
