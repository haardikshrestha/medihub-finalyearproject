import React from "react";
import { Link } from "react-router-dom";
import { HiAtSymbol, HiEye, HiPhone } from 'react-icons/hi';
import styles from "./styles.module.css";  // Make sure to use styles if needed
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  // If you're planning to use state, you should declare it using useState.
  const [user, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () =>{
    axios.get('http://localhost:5173/register')
    .then((res) => {
      console.log(res.data)
    })
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //dont want the page to refresh the page
    axios.post('http://localhost:5173/register', {email, number, username, password})
    .then(() => {
      alert('Sucessfully registered!')
      setEmail('')
      setUsername('')
      setNumber('')
      setPassword('')
      fetchUsers()
      navigate('/login')
    })
    .catch((error) => {
      console.log('Unable to register!')
    })

    
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
            <div className="flex flex-row gap-2 border rounded-xl relative ">
              {/* <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none hover:border-lime-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none hover:border-lime-500"
              /> */}
            </div>

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

            {/* Password Input */}
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
                <HiEye />
              </span>
            </div>

            {/* Confirmed Password Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon flex items-center px-4">
                <HiEye />
              </span>
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
          <p className="text-center text-gray-400 text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-lime-700 underline">
              Log In
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
