import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    setVerifyLoading(true);
    axios
      .post("http://localhost:5173/verify-otp", { email, otp })
      .then((response) => {
        toast.success("OTP Verified Sucessfully! Redirecting you to the login page.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setVerifyLoading(false);
      })
      .catch((error) => {
        toast.error(error);
        setVerifyLoading(false);
      });
  };

  const handleResendCode = () => {
    setResendLoading(true);
    axios
      .post("http://localhost:5173/resend-code", { email })
      .then((response) => {
        toast.success("OTP resent! Please check you email.");
        setResendLoading(false);
      })
      .catch((error) => {
        toast.error("Unable to resend code!");
        setResendLoading(false);
      });
  };

  return (
    <section className="bg-[#D6E3C8] min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-gray-100 flex rounded-2xl max-w-3xl p-3 items-center">
        <div className="md:w-4/5 mx-auto px-8 md:px-10 text-center mt-7 mb-7">
          <h2 className="font-bold text-xl text-black mb-3">Verify Account</h2>
          <p className="w-3/4 text-gray-400 mx-auto text-sm mb-8">
            Please enter the OTP pin received in your email.
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleVerify}>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full text-sm"
                name="otp"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className="bg-[#91BF77] rounded-xl text-white py-2 text-sm flex items-center justify-center"
              type="submit"
              disabled={verifyLoading}
            >
              {verifyLoading ? (
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
              ) : null}
              {verifyLoading ? "Verifying..." : "Verify"}
            </button>
            <button
              className="bg-gray-100 border border-[#91BF77] rounded-xl text-[#91BF77] py-2 text-sm flex items-center justify-center hover:bg-[#91BF77] hover:text-white transition duration-300"
              type="button"
              onClick={handleResendCode}
              disabled={resendLoading}
            >
              {resendLoading ? (
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
              ) : null}
              {resendLoading ? "Resending..." : "Resend Code"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}