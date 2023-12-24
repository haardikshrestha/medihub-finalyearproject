

import { setIsAuthenticated } from "@/app/authSlice";
import { useAppDispatch } from "@/app/store";
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const dispatch = useAppDispatch();

  // const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(setIsAuthenticated(true));
  // };

  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5173/login', {username, password})
      const token = response.data.token
      alert('Login Sucessful')
      setUsername('')
      setPassword('')
      fetchUsers();
      navigate('/')
      window.location.reload()
      localStorage.setItem('token', token)
    }catch(error){
      console.log('Login Error!', error)
    }
  }

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
          
            <h3 className="text-gray-800 text-2xl font-bold py-4">Log In</h3>
            <p className="w-3/4 text-gray-400 mx-auto text-sm">Please login to your account.</p>
          </div>

          {/* Form Section */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="text"
                name="username"
                id=""
                placeholder="Username"
                value={username}
                 onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-solid border-slate-400 "
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol />
              </span>
            </div>

            {/* Password Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                 type="password"
                 name="password"
                 id=""
                 placeholder="Password"
                 value={password}
                onChange={(e) => setPassword(e.target.value)}
                 required
                 className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none"
              />
              <span className="icon flex items-center px-4">
                <HiFingerPrint />
              </span>
            </div>

            {/* Submit Button */}
            <div className="input-button">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl py-2 text-gray-50 text-sm"
              >
                Log In
              </button>
            </div>
          </form>

          {/* Additional Info Section */}
          <p className="text-center text-gray-400 text-sm mt-2">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <a href="" className="text-lime-700 underline">
                Sign Up
              </a>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
