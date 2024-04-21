import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

interface LabTest {
  testName: string;
  testFields: { fieldName: string; normalRange: string }[];
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const CreateTestPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sampleId = queryParams.get("sampleId");
  const [labTest, setLabTest] = useState<LabTest | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(sampleId);
        const sampleResponse = await axios.get(
          `http://localhost:5173/getbyid/sample/${sampleId}`
        );
        const userEmail = sampleResponse.data.patientEmail;
        const userResponse = await axios.get(
          `http://localhost:5173/getbyemail/patient/${userEmail}`
        );
        setUser(userResponse.data);
        console.log(userResponse);
        const testId = sampleResponse.data.testID;
        const testResponse = await axios.get(
          `http://localhost:5173/getbyid/test/${testId}`
        );
        setLabTest(testResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sampleId) {
      fetchData();
    }
  }, [sampleId]);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValues({ ...fieldValues, [fieldName]: value });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5173/submit/test", {
        labTest,
        user,
        fieldValues,
        comment,
      });
  
      console.log(response.data.message);
  
      const updatedStatus = "Test Completed";
      await axios.put(`http://localhost:5173/samplecollections/${sampleId}/updateStatus`, { status: updatedStatus });
      toast.success("Lab Report saved and sent to the patient sucessfully!");
      navigate(-1);
  
    } catch (error) {
      console.error("Error submitting lab report:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Create Test</h1>
      {labTest && user && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-5">
          <div className="flex gap-4">
            <div className="mb-6 w-1/2">
              <label className="block text-gray-700 font-bold mb-2">
                Patient Name
              </label>
              <input
                type="text"
                value={`${user.firstName} ${user.lastName}`}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
            <div className="mb-6 w-1/2">
              <label className="block text-gray-700 font-bold mb-2">
                Patient Email
              </label>
              <input
                type="text"
                value={`${user.email}`}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Test Name
            </label>
            <input
              type="text"
              value={labTest.testName}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          <div className="mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left font-bold">Field Name</th>
                  <th className="py-2 px-4 text-left font-bold">Normal Range</th>
                  <th className="py-2 px-4 text-left font-bold">Value</th>
                </tr>
              </thead>
              <tbody>
                {labTest.testFields.map((field, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="py-2 px-4 border">{field.fieldName}</td>
                    <td className="py-2 px-4 border">{field.normalRange}</td>
                    <td className="py-2 px-4 border">
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={fieldValues[field.fieldName] || ""}
                        onChange={(e) =>
                          handleFieldChange(field.fieldName, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Comments
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default CreateTestPage;