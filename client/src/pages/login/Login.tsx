import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { setIsAuthenticated } from "@/app/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { token, role },
      } = await axios.post("http://localhost:5173/login", {
        email,
        password,
      });

      const {
        data: { emailExists },
      } = await axios.post("http://localhost:5173/checkpatient", { email });
      const {
        data: { verified },
      } = await axios.post("http://localhost:5173/checkverify", { email });

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      dispatch(setIsAuthenticated(true));

      if (role === "admin") {
        localStorage.removeItem("isLoggedIn");
        localStorage.setItem("isLoggedIn_admin", "true");
        navigate("/admin");
      } else if (role === "user") {
        localStorage.removeItem("isLoggedIn");
        localStorage.setItem("isLoggedIn_patient", "true");
        toast.success("Welcome back! You have logged in successfully!");
        navigate(emailExists ? `/patient?email=${email}` : `/in?email=${email}`);
      } else if (role === "doctor" || role === "pathologist") {
        localStorage.removeItem("isLoggedIn");
        localStorage.setItem("isLoggedIn_doctor", "true");
        localStorage.setItem("isLoggedIn_pathologist", "true");
        const path = verified ? role : "staff/reset";
        navigate(`/${role}?email=${email}`);
      } else {
        toast.error("Unauthorized access detected!");
        dispatch(setIsAuthenticated(false)); 
        navigate("/"); 
      }
    } catch (error) {
      handleLoginError(error);
      setLoading(false);
    }
  };

  const handleLoginError = (error: any) => {
    if (error.response && error.response.data) {
      const { data } = error.response;
      if (data.error) {
        toast.error(data.error);
      } else if (data.errors) {
        data.errors.forEach((err: { msg: string }) => toast.error(err.msg));
      }
    } else {
      console.error("Login Error!", error);
    }
  };

  const goRegister = () => {
    navigate("/signup");
  };

  return (
    <section className="bg-[#D6E3C8] min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-gray-100 flex rounded-2xl max-w-3xl p-3 items-center">
        <div className="md:block hidden">
          <img src="/src/assets/Signin.png" alt="Login Image" />
        </div>
        <div className="md:w-4/5 mx-auto px-8 md:px-10 text-center">
          <h2 className="font-bold text-xl text-black">Sign In</h2>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
              </svg>
            </div>
            <button
              className="bg-[#91BF77] rounded-xl text-white py-2 text-sm flex items-center justify-center"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
            <Link to={"/resetask"}>
              <button
                className="bg-gray-100 border border-[#91BF77] rounded-xl text-[#91BF77] py-2 text-sm w-full hover:bg-[#91BF77] hover:text-white transition duration-300"
                type="button"
              >
                Forgot Password?
              </button>
            </Link>
          </form>
          <div className="mt-6 text-gray-400">
            <hr className="border-gray-300 w-full" />
          </div>
          <div className="mt-4 text-xs items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <button
              className="mt-2 py-2 px-5 bg-white text-[#91BF77] border rounded-xl transition-all duration-300 hover:bg-[#91BF77] hover:text-white"
              onClick={goRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
