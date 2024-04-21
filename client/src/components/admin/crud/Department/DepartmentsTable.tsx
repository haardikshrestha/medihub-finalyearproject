import { useEffect, useState } from "react";
import axios from "axios";
import CreateDepartment from "./CreateDepartment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface Department {
  _id: string;
  depID: string;
  depName: string;
}

const DepartmentsTable = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get<Department[]>("http://localhost:5173/getdepartments");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (departmentId: string) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this department?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:5173/deletedepartment/${departmentId}`);
              setDepartments(departments.filter((department) => department._id !== departmentId));
            } catch (error) {
              console.error("Error deleting department:", error);
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
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Total Departments:</span>
          <span className="font-bold">{departments.length}</span>
        </div>

        <CreateDepartment />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Department ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Department Name
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
            {departments.map((department) => (
              <tr key={department._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{department.depID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{department.depName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(department._id)}
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

export default DepartmentsTable;
