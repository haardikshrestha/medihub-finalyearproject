import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LabTestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    testName: "",
    testPrice: 0,
    testFields: [""],
  });
  const [formVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible((prevVisible) => !prevVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "testPrice" ? parseFloat(value) : value,
    }));
  };

  const handleFieldChange = (index: number, value: string) => {
    setFormData((prevData) => {
      const newTestFields = [...prevData.testFields];
      newTestFields[index] = value;
      return {
        ...prevData,
        testFields: newTestFields,
      };
    });
  };

  const addField = () => {
    setFormData((prevData) => ({
      ...prevData,
      testFields: [...prevData.testFields, ""],
    }));
  };

  const removeField = (index: number) => {
    if (index === 0) return;
    setFormData((prevData) => ({
      ...prevData,
      testFields: prevData.testFields.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5173/post/labtests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset the form data if the submission is successful
        setFormData({
          testName: "",
          testPrice: 0,
          testFields: [""],
        });
        toast.success("Lab test added successfully");
      } else {
        console.error("Failed to submit form:", response.statusText);
        toast.error("Failed to add lab test");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error adding lab test");
    }
  };

  return (
    <>
      <ToastContainer />
      {!formVisible && (
        <button
          onClick={toggleFormVisibility}
          className=" text-white px-4 py-2 rounded-md bg-[#91BF77] hover:bg-[#7da466]"
        >
          Add Lab Test
        </button>
      )}
      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="absolute top-0 right-0 p-6 bg-white rounded-md border flex flex-col w-2/3 mt-7 mb-4 mr-6"
          style={{
            maxWidth: "400px",
            transform: formVisible ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-6">Add New Lab Test</h2>
          <div className="mb-4">
            <label htmlFor="testName" className="block text-gray-700 font-bold mb-2">
              Test Name
            </label>
            <input
              type="text"
              id="testName"
              name="testName"
              placeholder="Enter test name"
              required
              value={formData.testName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="testPrice" className="block text-gray-700 font-bold mb-2">
              Test Price
            </label>
            <input
              type="number"
              id="testPrice"
              name="testPrice"
              placeholder="Enter test price"
              required
              value={formData.testPrice.toString()}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Test Fields</label>
            {formData.testFields.map((field, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Enter test field"
                  value={field}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addField}
              className="bg-green-500 text-white px-2 py-1 rounded-md"
            >
              +
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#91BF77] text-white py-3 rounded-md hover:bg-[#7da466] transition duration-300"
          >
            Save
          </button>
          <button
            onClick={toggleFormVisibility}
            className="absolute top-3 right-5 text-xl self-end mt-2 bg-transparent text-gray-400 hover:text-gray-500"
          >
            <FaTimes />
          </button>
        </form>
      )}
    </>
  );
};

export default LabTestForm;
