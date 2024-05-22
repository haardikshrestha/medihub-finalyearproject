import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import {  HiEye,  HiEyeOff} from "react-icons/hi";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface ErrorResponse {
  error: string;
}

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (!confirmPassword) {
      toast.error("Confirm password is required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5173/postregister", { email, password });
      
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate(`/otp?email=${email}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const errorResponse = error.response.data as ErrorResponse;
        if (errorResponse.error) {
          toast.error(errorResponse.error);
        } else {
          console.error("Unable to register!", error);
        }
      } else {
        console.error("Unable to register!", error);
      }
    }
  };

  const goLogin = () => {
    navigate("/login")
  }

  return (
    <section className="bg-[#D6E3C8] min-h-screen flex items-center justify-center">
      <React.Fragment>
        <ToastContainer />
        {/* Login container */}
        <div className="bg-gray-100 flex rounded-2xl max-w-3xl p-3 items-center">
          {/* Image */}
          <div className="md:block hidden">
            <img className="" src="/src/assets/Signin.png" alt="Login Image" />
          </div>
          {/* Form */}
          <div className="md:w-4/5 mx-auto px-8 md:px-10 text-center">
            <h2 className="font-bold text-xl text-black">Sign Up</h2>

            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <input
                className="p-2 mt-8 rounded-xl border text-sm w-full"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full text-sm"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <HiEyeOff
                      className="h-6 text-gray-400 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <HiEye
                      className="h-6 text-gray-400 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full text-sm"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showConfirmPassword ? (
                    <HiEyeOff
                      className="h-6 text-gray-400 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <HiEye
                      className="h-6 text-gray-400 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </div>
              </div>
              <button
                className="bg-[#91BF77] rounded-xl text-white py-2 text-sm"
                type="submit"
              >
                Register
              </button>
            </form>

            <div className="mt-6 mb-2 text-gray-400">
            <hr className="border-gray-300 w-full" />
          </div>

            {/* Add Google Sign Up button here */}

            <div className="mt-5 text-xs flex items-center justify-center text-gray-500 gap-5">
              <p>Already have an account?</p>
              <button className="py-2 px-5 bg-white text-[#91BF77] border rounded-xl hover:bg-[#91BF77] hover:text-white"
              onClick={goLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    </section>
  );
}