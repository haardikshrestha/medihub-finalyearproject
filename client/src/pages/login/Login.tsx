import { setIsAuthenticated } from "@/app/authSlice";
import { useAppDispatch } from "@/app/store";
import { HiAtSymbol, HiEye, HiEyeOff } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useAppDispatch();

  //const notifySuccess = (message: string) => toast.success(message);
  //const notifyError = (message: string) => toast.error(message);

  // const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(setIsAuthenticated(true));
  // };

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:5173/register").then((res) => {
      console.log(res.data);
    });
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
      console.log(response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const role = response.data.role;

      if (role == "admin") {
        alert("Admin login Sucessful");
        dispatch(setIsAuthenticated(true));
        setEmail("");
        setPassword("");
        fetchUsers();
        console.log("Going to the homepage");
        navigate("/admin");
        window.location.reload();
      } else if (role == "user") {
        alert("User login Sucessful");
        dispatch(setIsAuthenticated(true));
        setEmail("");
        setPassword("");
        fetchUsers();
        console.log("Going to the homepage");
        const emailExists = response1.data.emailExists;

        if (emailExists) {
          navigate(`/patient?email=${email}`);
        } else {
          navigate(`/in?email=${email}`);
        }

        window.location.reload();
      }
    } catch (error: any) {
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
            <h3 className="text-gray-800 text-2xl font-bold py-4">Log In</h3>
            <p className="w-3/4 text-gray-400 mx-auto text-sm">
              Please login to your account.
            </p>
          </div>

          {/* Form Section */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
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

            {/* Password Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id=""
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none"
              />
              <span
                className="icon flex items-center px-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
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
            {/* Forgot Password Link */}
            <p className="text-right text-gray-400 text-sm ">
              <NavLink to={"/resetask"} className="text-lime-700 underline">
                <button
                  className="w-full border border-lime-500 rounded-xl py-2 px-4 text-lime-500 text-sm "
                  style={{ background: "white" }}
                >
                  Forgot Password?
                </button>
              </NavLink>
            </p>
          </form>

          {/* Additional Info Section */}
          <p className="text-center text-gray-400 text-sm ">
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
