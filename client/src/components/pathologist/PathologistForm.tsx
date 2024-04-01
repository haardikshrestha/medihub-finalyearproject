import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PathologistForm = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expertise, setExpertise] = useState("");
  const [degree, setDegree] = useState("");
  const [school, setSchool] = useState("");
  const [nmcNumber, setNmcNumber] = useState("");
  const [password, setPassword] = useState("");

  const generateRandomPassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let generatedPassword = "";
    for (let i = 0; i < 8; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    setPassword(generatedPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5173/api/newpathologist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email: emailAddress,
          phoneNumber,
          expertise,
          degree,
          school,
          nmcNumber,
          password,
        }),
      });
      if (response.ok) {
        alert("Pathologist information registered successfully");
        navigate("/pathologist");
      } else {
        alert("Failed to register pathologist information");
      }
    } catch (error) {
      console.error("Error registering pathologist information:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D6E3C8]">
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-screen-md w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 col-span-2 text-gray-800">
          Please fill pathologist details:
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label
            htmlFor="emailaddress"
            className="block text-sm font-medium text-gray-600"
          >
            Email Address
          </label>
          <input
            type="text"
            name="emailaddress"
            id="emailaddress"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phonenumber"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Expertise */}
        <div className="mb-4">
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-600">
            Expertise
          </label>
          <input
            type="text"
            name="expertise"
            id="expertise"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
          />
        </div>

        {/* Degree */}
        <div className="mb-4">
          <label htmlFor="degree" className="block text-sm font-medium text-gray-600">
            Degree
          </label>
          <input
            type="text"
            name="degree"
            id="degree"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </div>

        {/* School/University */}
        <div className="mb-4">
          <label htmlFor="school" className="block text-sm font-medium text-gray-600">
            School/University
          </label>
          <input
            type="text"
            name="school"
            id="school"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>

        {/* NMC Number */}
        <div className="mb-4">
          <label htmlFor="nmc" className="block text-sm font-medium text-gray-600">
            NMC Number
          </label>
          <input
            type="text"
            name="nmc"
            id="nmc"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={nmcNumber}
            onChange={(e) => setNmcNumber(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-2/3 focus:outline-none focus:ring focus:border-blue-300"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            readOnly
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="ml-3 bg-white text-[#ACE86C] hover:bg-[#ACE86C] hover:text-white py-2 px-3 border border-lime-500 focus:outline-none focus:shadow-outline transition duration-300"
            type="button"
            onClick={generateRandomPassword}
          >
            Generate
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 w-2/4 bg-[#ACE86C] text-white p-2 rounded-md hover:bg-[#93d34d] focus:outline-none focus:ring focus:border-blue-300 mx-auto block"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PathologistForm;
