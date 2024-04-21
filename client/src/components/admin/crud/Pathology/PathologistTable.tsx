import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface User {
  _id: string;
  username: string;
  email: string;
  number: string;
}

const PathologistTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:5173/getpathologists");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleadd = () => {
    navigate("/inp");
  };

  const handleDelete = async (userId: string) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this pathologist?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:5173/deletepathologist/${userId}`);
              setUsers(users.filter((user) => user._id !== userId));
            } catch (error) {
              console.error("Error deleting pathologist:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        {/* Total Users Box */}
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Pathologists:</span>
          <span className="font-bold">{users.length}</span>
        </div>
        <button
          className="bg-[#91BF77] text-white px-4 py-2 rounded-md hover:bg-[#7da466]"
          onClick={handleadd}
        >
          Add Pathologist
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
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
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(user._id)}
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

export default PathologistTable;
