// Import necessary dependencies
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

// Define the Day interface
interface Day {
  day: string;
  selected: boolean;
}

// DoctorForm component
const DoctorForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [expertise, setExpertise] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [nmcNumber, setNmcNumber] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<Day[]>([
    { day: "Sunday", selected: false },
    { day: "Monday", selected: false },
    { day: "Tuesday", selected: false },
    { day: "Wednesday", selected: false },
    { day: "Thursday", selected: false },
    { day: "Friday", selected: false },
    { day: "Saturday", selected: false },
  ]);
  const [fees, setFees] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [expertiseList, setExpertiseList] = useState<string[]>([]);

  useEffect(() => {
    // Fetch expertise list
    const fetchExpertiseList = async () => {
      try {
        const response = await axios.get<string[]>(
          "http://localhost:5173/getdepartmentnames",
        );
        setExpertiseList(response.data);
      } catch (error) {
        console.error("Error fetching expertise list:", error);
      }
    };

    fetchExpertiseList();
  }, []);

  // Generate random password function
  const generateRandomPassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-";
    let generatedPassword = "";
    for (let i = 0; i < 8; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    setPassword(generatedPassword);
  };

  console.log(fullName);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5173/newdoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullName,
          emailaddress: emailAddress,
          phonenumber: phoneNumber,
          expertise,
          degree,
          school,
          nmc: nmcNumber,
          startTime,
          endTime,
          daysAvailable: selectedDays.filter((day) => day.selected).map((day) => day.day),
          fees,
          password,
        }),
      });
      if (response.ok) {
        alert("Doctor and user information registered successfully");
        navigate(-1);
      } else {
        alert("Failed to register doctor and user information");
      }
    } catch (error) {
      console.error("Error registering doctor and user information:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Day selection handler
  const handleDaySelection = (index: number) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index].selected = !newSelectedDays[index].selected;
    setSelectedDays(newSelectedDays);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D6E3C8]">
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-screen-md w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 col-span-2 text-gray-800">
          Doctor Information
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

        <div className="mb-4">
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-600">
            Expertise
          </label>
          <select
            name="expertise"
            id="expertise"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
          >
            <option value="">Select Expertise</option>
            {expertiseList.map((exp, index) => (
              <option key={index} value={exp}>
                {exp}
              </option>
            ))}
          </select>
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

        <div className="mb-4">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-600">
            Start Time
          </label>
          <select
            name="startTime"
            id="startTime"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="08:00 AM">08:00 AM</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-600">
            End Time
          </label>
          <select
            name="endTime"
            id="endTime"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          >
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="05:00 PM">05:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Days Available */}
        <div className="mb-4">
          <label
            htmlFor="daysAvailable"
            className="block text-sm font-medium text-gray-600"
          >
            Days Available
          </label>
          <div className="flex flex-wrap mt-1">
            {selectedDays.map(({ day, selected }, index) => (
              <div
                key={index}
                className={`cursor-pointer p-2 border border-gray-300 rounded-md mr-2 mb-2 ${
                  selected ? "bg-[#8AC185] text-white" : ""
                }`}
                onClick={() => handleDaySelection(index)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Fees */}
        <div className="mb-4">
          <label htmlFor="fees" className="block text-sm font-medium text-gray-600">
            Fees
          </label>
          <input
            type="text"
            name="fees"
            id="fees"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
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
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mr-2" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
