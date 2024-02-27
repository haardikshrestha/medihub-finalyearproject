import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiAtSymbol, HiEye, HiPhone, HiEyeOff, HiIdentification } from "react-icons/hi";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const navigate = useNavigate();

  // const [isMounted, setIsMounted] = useState(true);

  // useEffect(() => {
  //   return () => {
  //     // Component will unmount, set isMounted to false
  //     setIsMounted(false);
  //   };
  // }, []);

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = () => {
  //   axios
  //     .get("http://localhost:5173/register")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Fetch Users Error:", error);
  //     });
  // };

  // const isValidEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!isValidEmail(email)) {
  //     alert("Invalid email address");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   axios
  //     .post("http://localhost:5173/register", { email, number, username, password })
  //     .then(() => {
  //       alert("Check your email for OTP verification.");
  //       setEmail("");
  //       setUsername("");
  //       setNumber("");
  //       setPassword("");
  //       setConfirmPassword("");
  //       fetchUsers();
  //       navigate(`/otp?email=${email}`);
  //     })
  //     .catch((error) => {
  //       if (error.response && error.response.data && error.response.data.error) {
  //         alert(error.response.data.error);
  //       } else if (error.response && error.response.data && error.response.data.errors) {
  //         const errors = error.response.data.errors;
  //         errors.forEach((err: { msg: string }) => alert(err.msg));
  //       } else {
  //         console.error("Unable to register!", error);
  //       }
  //     });
  // };

  return (
    <section className="bg-[#D6E3C8] min-h-screen flex items-center justify-center">
      {/* Login container */}
      <div className="bg-gray-100 flex rounded-2xl max-w-3xl p-3 items-center">
        {/* Image */}
        <div className="md:block hidden">
          <img
            className=""
            src="/src/assets/Signin.png"
            alt="Login Image"
          />
        </div>
        {/* Form */}
        <div className="md:w-4/5 mx-auto px-8 md:px-10 text-center">
          <h2 className="font-bold text-xl text-black">Sign Up</h2>

          <form className="flex flex-col gap-4" >
            <input
              className="p-2 mt-8 rounded-xl border text-sm w-full" // Adjusted width to full width
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full text-sm" // Adjusted width to full width
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full text-sm" // Adjusted width to full width
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-[#ACE86C] rounded-xl text-white py-2 text-sm"
              type="submit"
            >
              Register
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              {/* SVG Path for Google icon */}
            </svg>
            Sign up with Google
          </button>

          <div className="mt-3 text-xs flex items-center text-[#002D74]">
            <p>Already have an account?</p>
            <button className="py-2 px-5 bg-white text-[#ACE86C] border rounded-xl hover:scale-110 duration-300">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
