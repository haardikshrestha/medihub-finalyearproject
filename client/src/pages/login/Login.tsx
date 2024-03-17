import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HiAtSymbol, HiEye, HiEyeOff } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { setIsAuthenticated } from "@/app/authSlice";
import { useAppDispatch } from "@/app/store";

import backgroundImage from "src/assets/doc2.svg"; // Update the path accordingly

const Login = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5173/register");
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5173/login", {
        email,
        password,
      });

      const response1 = await axios.post("http://localhost:5173/checkpatient", {
        email,
      });

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      console.log("hey");

      if (role === "admin" || role === "user" || role === "doctor") {
        const successMessage = role === "admin" ? "Admin" : "User";
        alert(`Doctor login successful`);

        setEmail("");
        setPassword("");
        fetchUsers();
        console.log("hi");

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          const emailExists = response1.data.emailExists;
          navigate(emailExists ? `/patient?email=${email}` : `/in?email=${email}`);
        } else if (role === "doctor") {
          console.log("doc");
          navigate("/ind?email=" + email);
        }

        window.location.reload();
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error: any) => {
    if (error.response && error.response.data) {
      const { data } = error.response;

      if (data.error) {
        toast.error(data.error);
      } else if (data.errors) {
        const errors = data.errors;
        errors.forEach((err: { msg: string }) => alert(err.msg));
      } else {
        console.error("Login Error!", error);
      }
    } else {
      console.error("Login Error!", error);
    }
  };

  const goRegister = () =>{
    navigate("/signup")
  }

  return (
    <section className="bg-[#D6E3C8] min-h-screen flex items-center justify-center">
      {/* Login container */}
      <div className="bg-gray-100 flex rounded-2xl max-w-3xl p-3 items-center">
        {/* Image */}
        <div className="md:block hidden">
          <img className="" src="/src/assets/Signin.png" alt="Login Image" />
        </div>
        {/* Form */}
        <div className="md:w-4/5 mx-auto px-8 md:px-10 text-center">
          <h2 className="font-bold text-xl text-black">Sign In</h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <path d="M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                ) : (
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                )}
              </svg>
            </div>
            <button
              className="bg-[#ACE86C] rounded-xl text-white py-2 text-sm"
              type="submit"
            >
              Login
            </button>
            <button
              className="bg-gray-100 border border-[#ACE86C] rounded-xl text-[#ACE86C] py-2 text-sm"
              type="submit"
            >
              Forgot Password?
            </button>
          </form>

          {/* <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div> */}

          {/* <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              {/* SVG Path for Google icon 
            </svg>
            Login with Google
          </button> */}

          <div className="mt-6 text-gray-400">
            <hr className="border-gray-300 w-full" />
          </div>

          <div className="mt-4 text-xs  items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <button className="mt-2 py-2 px-5 bg-white text-[#ACE86C] border rounded-xl transition-all duration-300 hover:bg-[#ACE86C] hover:text-white"
            onClick={goRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
