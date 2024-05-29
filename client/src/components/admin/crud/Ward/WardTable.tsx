import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Ward {
  _id: string;
  wardId: string;
  numberOfBeds: number;
  bedIds: string[];
}

const WardTable = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const navigate = useNavigate();

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

  const handleDelete = async (wardId: string) => {
    try {
      const response = await axios.post("http://localhost:5173/deleteward", { wardId });
      if (response.status === 200) {
        setWards((prevWards) => prevWards.filter((ward) => ward._id !== wardId));
        alert("Ward deleted successfully");
      } else {
        alert("Failed to delete ward");
      }
    } catch (error) {
      console.error("Error deleting ward:", error);
      alert("An error occurred while deleting the ward");
    }
  };

  const handleAddWard = () => {
    navigate("/admin/createwards");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Wards:</span>
          <span className="font-bold">{wards.length}</span>
        </div>
        <button onClick={handleAddWard} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Add Ward
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ward ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number of Beds
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bed IDs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wards.map((ward) => (
              <tr key={ward._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ward.wardId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ward.numberOfBeds}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ward.bedIds.join(", ")}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-red-600 hover:text-red-900 mr-2"
                    onClick={() => handleDelete(ward._id)}
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
