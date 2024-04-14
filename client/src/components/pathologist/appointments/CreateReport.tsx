import React, { useState, useEffect } from "react";
import axios from "axios";

interface TestField {
  _id: string;
  field: string;
}

interface LabTest {
  _id: string;
  testName: string;
  testPrice: number;
  testFields: TestField[];
}

interface TestResult {
  patientName: string;
  doctorName: string;
  testResultsPdf: File | null;
  date: string;
  testType: string;
  comments: string;
  [key: string]: string | number | File | null;
}

const CreateTest: React.FC = () => {
  const [labTest, setLabTest] = useState<LabTest | null>(null);
  const [testResult, setTestResult] = useState<TestResult>({
    patientName: "",
    doctorName: "",
    testResultsPdf: null,
    date: "",
    testType: "",
    comments: "",
  });

  const testId = new URLSearchParams(window.location.search).get("testid");

  useEffect(() => {
    if (testId) {
      fetchLabTest(testId);
    }
  }, [testId]);

  const fetchLabTest = async (id: string) => {
    try {
      const response = await axios.get<LabTest>(
        `http://localhost:5173/reportlabtests/${id}`,
      );
      setLabTest(response.data);
    } catch (error) {
      console.error("Error fetching lab test:", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setTestResult((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setTestResult((prevState) => ({ ...prevState, testResultsPdf: file }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(testResult)) {
        formData.append(key, value as string);
      }
      if (testResult.testResultsPdf) {
        formData.append("testResultsPdf", testResult.testResultsPdf);
      }
      await axios.post("http://localhost:5173/testresults", formData);
      alert("Test result saved successfully");
    } catch (error) {
      console.error("Error saving test result:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Test Result</h1>
      {labTest ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex justify-between">
            <div className="mb-4">
              <label htmlFor="patientName" className="block text-gray-700 font-bold mb-2">
                Patient Name
              </label>
              <p>Hardik Shrestha</p>
            </div>
            <div className="mb-4">
              <label htmlFor="doctorName" className="block text-gray-700 font-bold mb-2">
                Doctor Name
              </label>
              <p>Doctor Shrestha</p>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={testResult.date}
              onChange={handleInputChange}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="testType" className="block text-gray-700 font-bold mb-2">
              Test Type
            </label>
            <input
              type="text"
              id="testType"
              name="testType"
              value={labTest.testName}
              onChange={handleInputChange}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
            />
          </div>
          {labTest.testFields.map((field) => (
            <div key={field._id} className="mb-4">
              <label htmlFor={field.field} className="block text-gray-700 font-bold mb-2">
                {field.field}
              </label>
              <input
                type="text"
                id={field.field}
                name={field.field}
                value={field.field}
                onChange={handleInputChange}
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="comments" className="block text-gray-700 font-bold mb-2">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={testResult.comments}
              onChange={handleInputChange}
              className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Test Result
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CreateTest;
