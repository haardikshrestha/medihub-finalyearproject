import React, { useState, useEffect } from "react";
import { Link, useNavigate   } from "react-router-dom";
import { HiAtSymbol, HiEye, HiPhone, HiEyeOff, HiIdentification  } from 'react-icons/hi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:5173/register')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Fetch Users Error:', error);
      });
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      notifyError('Invalid email address');
      return;
    }

    if (password !== confirmPassword) {
      notifyError('Passwords do not match');
      return;
    }

    axios.post('http://localhost:5173/register', { email, number, username, password })
      .then(() => {
        alert('Check your email for OTP verification.');
        setEmail('');
        setUsername('');
        setNumber('');
        setPassword('');
        setConfirmPassword('');
        fetchUsers();
        navigate(`/otp?email=${email}`);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
            notifyError(error.response.data.error);
        } else if (error.response && error.response.data && error.response.data.errors) {
            // Handle multiple validation errors
            const errors = error.response.data.errors;
            errors.forEach((err: { msg: string }) => notifyError(err.msg));
        } else {
            console.error('Unable to register!', error);
        }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="bg-lime-300 w-1/2 relative overflow-hidden flex items-center justify-center">
        <img
          src="src/assets/doc2.svg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Panel */}
      <div className="bg-slate-50 w-1/2 flex flex-col justify-evenly py-8 text-center">
        <section className="w-3/4 mx-auto flex flex-col gap-10">
          {/* Title Section */}
          <div className="title">
            <h3 className="text-gray-800 text-2xl font-bold py-4">Sign Up</h3>
            <p className="w-3/4 text-gray-400 mx-auto text-sm">Please sign up your account.</p>
          </div>

          {/* Form Section */}
          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            {/* Email Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-solid border-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol />
              </span>
            </div>

            {/* Number Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="text"
                name="number"
                placeholder="Phone number"
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <span className="icon flex items-center px-4">
                <HiPhone />
              </span>
            </div>

            {/* Username Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="icon flex items-center px-4">
                <HiIdentification  />
              </span>
            </div>

            <div>
      {/* Password Input */}
      <div className="flex border rounded-xl relative hover:border-lime-500 mb-5">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          required
          className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="icon flex items-center px-4 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <HiEyeOff /> : <HiEye />}
        </span>
      </div>

      {/* Confirm Password Input */}
      <div className="flex border rounded-xl relative hover:border-lime-500">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span
          className="icon flex items-center px-4 cursor-pointer"
          onClick={toggleConfirmPasswordVisibility}
        >
          {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
        </span>
      </div>
    </div>

            {/* Submit Button */}
            <div className="input-button">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl py-2 text-gray-50 text-sm"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Additional Info Section */}
          <p className="text-center text-gray-400 text-sm mt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-lime-700 underline">
              Log In
            </Link>
          </p>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}
