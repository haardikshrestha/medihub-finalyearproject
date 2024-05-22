import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface User {
  _id: string;
  patientId: string;
  email: string;
  firstName: string;
  lastName: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:5173/getpatients");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (email: string) => {
    navigate(`/admin/vieweditpatients?email=${email}`);
  };

  const handleEdit = (email: string) => {
    navigate(`/admin/vieweditpatients?email=${email}`);
  };


  const handleDelete = async (email: string) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:5173/deletepatients/${email}`);
              setUsers(users.filter((user) => user.email !== email));
            } catch (error) {
              console.error("Error deleting user:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            /* No action required */
          },
        },
      ],
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Patients:</span>
          <span className="font-bold">{users.length}</span>
        </div>
        <button className="bg-lime-500 text-white px-4 py-2 rounded">Add Users</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.patientId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    onClick={() => handleView(user.email)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-600 hover:text-green-900 mr-2"
                    onClick={() => handleEdit(user.email)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(user.email)}
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

export default UserTable;
