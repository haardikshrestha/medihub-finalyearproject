import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateWard from "./CreateWard";

interface Ward {
  _id: string;
  wardId: string;
}

const WardTable = () => {
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get<Ward[]>("http://localhost:5173/wards");
        setWards(response.data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };

    fetchWards();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-2">
        {/* Total Wards Box */}
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Wards:</span>
          <span className="font-bold">{wards.length}</span>
        </div>

        <CreateWard/>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ward ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wards.map((ward) => (
              <tr key={ward._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ward.wardId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-2">
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    // Add delete functionality
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardTable;
