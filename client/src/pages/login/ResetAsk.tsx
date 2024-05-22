import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiAtSymbol } from "react-icons/hi";

const ResetAsk = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make an API call to initiate the password reset process
      const response = await axios.post("http://localhost:5173/reset-password", { email });

      toast.success(response.data.message);

      // Navigate back to the login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error('Password Reset Error:', error);
      toast.error('Error initiating password reset. Please try again.');
    }
  };

  return (
    <section className="bg-[#D6E3C8] min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-gray-100 flex rounded-2xl max-w-lg p-6 items-center">
        <div className="w-full text-center">
          <h2 className="font-bold text-2xl text-black mb-4">Reset Password</h2>
          <p className="text-gray-400 mb-8">
            Please enter your email address to receive a reset link.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-gray-100 outline-none border-solid border-gray-400"
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol />
              </span>
            </div>
            <button
              type="submit"
              className="bg-[#91BF77] rounded-xl text-white py-2 text-sm flex items-center justify-center"
            >
              Send Link
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-4">
            Go back to{" "}
            <Link to="/login" className="text-lime-700 underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetAsk;
