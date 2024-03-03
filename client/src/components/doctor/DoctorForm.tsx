import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DoctorForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");

  const [selectedDays, setSelectedDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const generateRandomPassword = () => {
    const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars: string = "0123456789";
    const specialChars: string = "!@#$%^&*()_+";

    const getRandomChar = (charSet: string) => {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      return charSet[randomIndex];
    };

    const newPassword: string =
      getRandomChar(lowercaseChars) +
      getRandomChar(uppercaseChars) +
      getRandomChar(numberChars) +
      getRandomChar(specialChars) +
      Array.from({ length: 4 }, () =>
        getRandomChar(lowercaseChars + uppercaseChars + numberChars + specialChars),
      ).join("");

    // Shuffle the password characters to make it more random
    const shuffledPassword: string = newPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(shuffledPassword);
  };

  const handleDayClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const expertise = formData.get("expertise") as string;
      const degree = formData.get("degree") as string;
      const school = formData.get("school") as string;
      const experience = formData.get("experience") as string;
      const workingHours = formData.get("workingHours") as string;
      const apptDuration = formData.get("apptDuration") as string;
      const daysAvailable = formData.get("daysAvailable") as string; // Multiple values, use getAll
      const fees = formData.get("fees") as string;
      const nmc = formData.get("nmc") as string;

      console.log(
        nmc,
        expertise,
        degree,
        school,
        experience,
        workingHours,
        apptDuration,
        daysAvailable,
        fees,
      );

      // Check for required fields
      if (
        !nmc ||
        !expertise ||
        !degree ||
        !school ||
        !workingHours ||
        !apptDuration ||
        !daysAvailable ||
        !fees
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await axios.post("http://localhost:5173/doctorregister", {
        nmc,
        email,
        expertise,
        degree,
        school,
        workingHours,
        apptDuration,
        daysAvailable,
        fees,
      });

      if (response.status === 201) {
        alert("Doctor information registered successfully");
        navigate("/doctor");
        // You may navigate to a different route after successful registration
        // navigate(`/some-other-route?email=${email}`);
      } else {
        alert("Failed to register doctor information");
      }
    } catch (error) {
      console.error("Error registering doctor information:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#D6E3C8]"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-screen-md w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-4"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold mb-4 col-span-2 text-gray-800">
          Doctor Information
        </h2>

        <div className="mb-4">
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="text"
            name="emailaddress"
            id="emailaddress"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-600">
            Expertise
          </label>
          <input
            type="text"
            name="expertise"
            id="expertise"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="degree" className="block text-sm font-medium text-gray-600">
            Degree
          </label>
          <input
            type="text"
            name="degree"
            id="degree"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="school" className="block text-sm font-medium text-gray-600">
            School/University
          </label>
          <input
            type="text"
            name="school"
            id="school"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nmc" className="block text-sm font-medium text-gray-600">
            NMC Number
          </label>
          <input
            type="text"
            name="nmc"
            id="nmc"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="workingHours"
            className="block text-sm font-medium text-gray-600"
          >
            Working Hours
          </label>
          <input
            type="text"
            name="workingHours"
            id="workingHours"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="apptDuration"
            className="block text-sm font-medium text-gray-600"
          >
            Appointment Duration
          </label>
          <select
            name="apptDuration"
            id="apptDuration"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="10">10 minutes</option>
            <option value="20">20 minutes</option>
            <option value="30">30 minutes</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="daysAvailable"
            className="block text-sm font-medium text-gray-600"
          >
            Days Available
          </label>
          <input
            type="text"
            name="daysAvailable"
            id="daysAvailable"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fees" className="block text-sm font-medium text-gray-600">
            Fees
          </label>
          <input
            type="text"
            name="fees"
            id="fees"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
        <label htmlFor="fees" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-2/3 focus:outline-none focus:ring focus:border-blue-300"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            //readOnly
          />
          <button
            className="ml-3 bg-white text-[#ACE86C] hover:bg-[#ACE86C] hover:text-white py-2 px-3 border border-lime-500 focus:outline-none focus:shadow-outline transition duration-300"
            type="button"
            onClick={generateRandomPassword}
          >
            Generate
          </button>
        </div>

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

export default DoctorForm;
