import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      // Call the server endpoint to update the password
      await axios.post("http://localhost:5173/update-password", { token, newPassword });
      notifySuccess("Password updated successfully!");
      // Redirect the user to the login page or any other appropriate page
      navigate("/login");
    } catch (error) {
      console.error("Reset Password Error:", error);
      notifyError("Error updating password. Please try again.");
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
              Please enter your new password.
            </p>
          </div>

          <form className="flex flex-col gap-5">
            {/* Token Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="text"
                name="token"
                placeholder="Reset Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-solid border-slate-400"
              />
            </div>

            {/* New Password Input */}
            <div className="flex border rounded-xl relative hover:border-lime-500">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-solid border-slate-400"
              />
            </div>

            {/* Submit Button */}
            <div className="input-button">
              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl py-2 text-gray-50 text-sm"
              >
                Reset Password
              </button>
            </div>
        </form>
        </section>
      </div>
    </div>
  );
};

export default ResetPassword;
