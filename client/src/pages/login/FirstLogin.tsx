import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiEye, HiEyeOff } from "react-icons/hi";

const FirstLogin = () => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const notifySuccess = (message: string) => isMounted && toast.success(message);
  const notifyError = (message: string) => isMounted && toast.error(message);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        notifyError("Passwords do not match. Please enter matching passwords.");
        return;
      }
      await axios.post("http://localhost:5173/staff/updatepassword", { email, newPassword });
      notifySuccess("Password updated successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Reset Password Error:", error);
      notifyError("Error updating password. Please try again.");
    }
  };

  return (
    <section className="bg-[#D6E3C8] min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-gray-100 flex rounded-2xl max-w-lg p-6 items-center">
        <div className="w-full text-center">
          <h2 className="font-bold text-2xl text-black mb-4">Reset Password</h2>
          <p className="text-gray-400 mb-8">Please enter your new password.</p>
          <form className="flex flex-col gap-4">
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-gray-100 outline-none border-solid border-gray-400"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <HiEyeOff /> : <HiEye />}
              </span>
            </div>
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-gray-100 outline-none border-solid border-gray-400"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetPassword}
              className="bg-[#91BF77] rounded-xl text-white py-2 text-sm flex items-center justify-center"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FirstLogin;
