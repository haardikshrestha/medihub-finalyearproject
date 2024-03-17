import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorForm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [selectedDays, setSelectedDays] = useState([
    { day: "Sunday", selected: false },
    { day: "Monday", selected: false },
    { day: "Tuesday", selected: false },
    { day: "Wednesday", selected: false },
    { day: "Thursday", selected: false },
    { day: "Friday", selected: false },
    { day: "Saturday", selected: false },
    
  ]);

  const generateRandomPassword = () => {
    // Function to generate random password
    // Implementation remains the same
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const fullName = formData.get("fullname") as string;
      const emailAddress = formData.get("emailaddress") as string;
      const phoneNumber = formData.get("phonenumber") as string;
      const expertise = formData.get("expertise") as string;
      const degree = formData.get("degree") as string;
      const school = formData.get("school") as string;
      const nmc = formData.get("nmc") as string;
      const workingHours = formData.get("workingHours") as string;
      const apptDuration = formData.get("apptDuration") as string;
      const daysAvailable = selectedDays
        .filter((day) => day.selected)
        .map((day) => day.day);
      const fees = formData.get("fees") as string;

      console.log(
        fullName,
        emailAddress,
        phoneNumber,
        expertise,
        degree,
        school,
        nmc,
        workingHours,
        apptDuration,
        daysAvailable,
        fees
      );

      // Check for required fields
      if (
        !fullName ||
        !emailAddress ||
        !phoneNumber ||
        !expertise ||
        !degree ||
        !school ||
        !nmc ||
        !workingHours ||
        !apptDuration ||
        !daysAvailable.length ||
        !fees
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      // Submit the form data to the server
      const response = await fetch("http://localhost:5173/doctorregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          emailAddress,
          phoneNumber,
          expertise,
          degree,
          school,
          nmc,
          workingHours,
          apptDuration,
          daysAvailable,
          fees,
        }),
      });

      if (response.ok) {
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
    <div className="min-h-screen flex items-center justify-center bg-[#D6E3C8]">
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-screen-md w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-4"
        onSubmit={handleRegister}
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
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="emailaddress" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="text"
            name="emailaddress"
            id="emailaddress"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
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
          />
        </div>

        {/* Working Hours */}
        <div className="mb-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-600">
              Start Time
            </label>
            <select
              name="startTime"
              id="startTime"
              className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              {/* Options for Start Time */}
              <option value="08:00 AM">08:00 AM</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-600">
              End Time
            </label>
            <select
              name="endTime"
              id="endTime"
              className="mt-1 p-2.5 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              {/* Options for End Time */}
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="05:00 PM">05:00 PM</option>
              <option value="06:00 PM">06:00 PM</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        {/* Days Available */}
        <div className="mb-4">
          <label htmlFor="daysAvailable" className="block text-sm font-medium text-gray-600">
            Days Available
          </label>
          <div className="flex flex-wrap mt-1">
            {selectedDays.map((day, index) => (
              <div
                key={index}
                className={`cursor-pointer p-2 border border-gray-300 rounded-md mr-2 mb-2 ${
                  day.selected ? "bg-[#8AC185] text-white" : ""
                }`}
                onClick={() => {
                  const newSelectedDays = [...selectedDays];
                  newSelectedDays[index].selected = !newSelectedDays[index].selected;
                  setSelectedDays(newSelectedDays);
                }}
              >
                {day.day}
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

export default DoctorForm;
