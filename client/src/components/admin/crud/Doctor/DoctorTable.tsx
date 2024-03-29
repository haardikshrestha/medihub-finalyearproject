import  { useEffect, useState } from "react";
import axios from "axios";
import CreateDoctor from "./CreateDoctor";

interface User {
  _id: string;
  username: string;
  email: string;
  number: string;
}

const DoctorTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:5173/getdoctors");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Call your delete user API or function here using the selectedUserId
    // ...

    // After successful deletion, close the modal
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteCancel = () => {
    // Cancel the delete action, close the modal
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };
  

  return (
    <div>
      <div className="flex justify-between mb-2">
        {/* Total Users Box */}
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Doctors:</span>
          <span className="font-bold">{users.length}</span>
        </div>

        {/* "Add Users" Button */}
        <CreateDoctor/>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Username
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
                Phone Number
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-2">
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteClick(user._id)}
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

export default DoctorTable;
