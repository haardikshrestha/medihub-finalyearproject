import { useState } from "react";
import axios from "axios";

const CreateDoctor = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [nmcnumber, setNmcnumber] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    const passwordLength = 8;

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:5173/doctorregister", { fullname, email, nmcnumber, phonenumber, password })
      .then(() => {
        alert("Check your email for OTP verification.");
        setFullname("");
        setPhonenumber("");
        setNmcnumber("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          errors.forEach((err: { msg: string }) => alert(err.msg));
        } else {
          console.error("Unable to register!", error);
        }
      });
  };

  return (
    <form className="bg-white rounded-lg px-10 pt-6 pb-8 mb-4 mt-4" onSubmit={handleRegister}>      
    <div className="mb-6">
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div className="mb-6 flex">
        {/* Phone Number */}
        <div className="mr-4 w-1/2">
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phonenumber"
            type="text"
            placeholder="Phone Number"
            value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>

        {/* NMC Number */}
        <div className="w-1/2">
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nmcnumber"
            type="text"
            placeholder="NMC Number"
            value={nmcnumber}
          onChange={(e) => setNmcnumber(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-6 relative flex">
        <input
          className="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          readOnly
        />
        <button
          className="ml-3 bg-white text-lime-500 hover:bg-lime-500 hover:text-white py-2 px-3 border border-lime-500 focus:outline-none focus:shadow-outline transition duration-300"
          type="button"
          onClick={generateRandomPassword}
        >
          Generate
        </button>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          type="submit"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default CreateDoctor;
