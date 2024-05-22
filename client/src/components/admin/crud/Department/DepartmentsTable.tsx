import { useState, useEffect } from "react";
import axios from "axios";
import CreateDepartment from "./CreateDepartment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Department {
  _id: string;
  depID: string;
  depName: string;
  depNameShort: string;
}

const DepartmentsTable = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedDepartment, setEditedDepartment] = useState<Department | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get<Department[]>(
          "http://localhost:5173/getdepartments"
        );
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
              await axios.delete(
                `http://localhost:5173/deleteDepartment/${departmentId}`
              );
              setDepartments(
                departments.filter((department) => department._id !== departmentId)
              );
              toast.success("Department deleted successfully!");
            } catch (error) {
              console.error("Error deleting department:", error);
              toast.error("Error deleting department");
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

  const handleEdit = (department: Department) => {
    setEditedDepartment(department);
    setShowEditModal(true);
  };

  const handleEditSave = async (editedDepartment: Department) => {
    try {
      const response = await axios.put(
        `http://localhost:5173/editDepartment/${editedDepartment._id}`,
        editedDepartment
      );
      console.log(response.data);
      setDepartments(
        departments.map((department) =>
          department._id === editedDepartment._id ? editedDepartment : department
        )
      );
      toast.success("Department edited successfully!");
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing department:", error);
      toast.error("Error editing department");
    }
  };


  return (
    <div>
      <ToastContainer/>
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
                Department Short Name
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {department.depID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {department.depNameShort}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {department.depName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    onClick={() => handleEdit(department)}
                  >
                    Edit
                  </button>

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

      {/* Edit Department Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 blur"></div>
          <div className="relative bg-white rounded-lg p-8">
            <h3 className="text-lg font-semibold mb-4">Edit Department</h3>
            {editedDepartment && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSave(editedDepartment);
                }}
              >
                <div>
                  <label htmlFor="depID" className="block mb-2">
                    Department ID:
                  </label>
                  <input
                    type="text"
                    id="depID"
                    name="depID"
                    value={editedDepartment.depID}
                    onChange={(e) =>
                      setEditedDepartment({
                        ...editedDepartment,
                        depID: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full"
                  />
                </div>

                <div>
                  <label htmlFor="depNameShort" className="block mb-2">
                    Department Short Name:
                  </label>
                  <input
                    type="text"
                    id="depNameShort"
                    name="depNameShort"
                    value={editedDepartment.depNameShort}
                    onChange={(e) =>
                      setEditedDepartment({
                        ...editedDepartment,
                        depNameShort: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full"
                  />
                </div>

                <div>
                  <label htmlFor="depName" className="block mb-2">
                    Department Name:
                  </label>
                  <input
                    type="text"
                    id="depName"
                    name="depName"
                    value={editedDepartment.depName}
                    onChange={(e) =>
                      setEditedDepartment({
                        ...editedDepartment,
                        depName: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg py-2 px-3 w-full"
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg mr-2"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsTable;
