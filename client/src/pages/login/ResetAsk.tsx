// ResetAsk.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiAtSymbol } from "react-icons/hi";

const ResetAsk = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make an API call to initiate the password reset process
      const response = await axios.post("http://localhost:5173/reset-password", { email });
      
      notifySuccess(response.data.message);
      // Optionally, you can redirect the user to another page
      navigate('/login');
    } catch (error) {
      console.error('Password Reset Error:', error);
      notifyError('Error initiating password reset. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="bg-lime-300 w-1/2 relative overflow-hidden flex items-center justify-center">
        <img src="src/assets/doc2.svg" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Right Panel */}
      <div className="bg-slate-50 w-1/2 flex flex-col justify-evenly py-10 text-center">
        <section className="w-3/4 mx-auto flex flex-col gap-10">
          {/* Title Section */}
          <div className="title">
            <h3 className="text-gray-800 text-2xl font-bold py-4">Reset Password</h3>
            <p className="w-3/4 text-gray-400 mx-auto text-sm">
              Please enter your email address for reset link.
            </p>
          </div>

          {/* Form Section */}
          <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
            {/* Email Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="text"
                name="email"
                id=""
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-solid border-slate-400 "
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol />
              </span>
            </div>

            {/* Submit Button */}
            <div className="input-button">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl py-2 text-gray-50 text-sm"
              >
                Send Link
              </button>
            </div>
          </form>
          <p className="text-center text-gray-400 text-sm ">
            Go back to{" "}
            <Link to="/login" className="text-lime-700 underline">
              Log In
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ResetAsk;
