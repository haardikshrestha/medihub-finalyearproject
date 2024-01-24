import { useState } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";

const CreateDoctor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [nmcnumber, setNmcnumber] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const generateRandomPassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    const passwordLength = 8;
  
    const newPassword = Array.from({ length: passwordLength }, () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters[randomIndex];
    }).join("");
  
    setPassword(newPassword);
  };
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:5173/doctorregister", {
        fullname,
        email,
        nmcnumber,
        phonenumber,
        password,
      })
      .then(() => {
        alert("Check your email for OTP verification.");
        setFullname("");
        setPhonenumber("");
        setNmcnumber("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          errors.forEach((err: { msg: string }) => alert(err.msg));
        } else {
          console.error("Unable to register!", error);
        }
      });
  };

  return (
    <>
      {/* Modal toggle */}
      <button
        onClick={toggleModal}
        className="block text-white bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Add Doctor
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
            <div>
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Doctor
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <HiX className="w-4 h-4" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleRegister}>
                <div className="mb-6">
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>

                <div className="mb-6 flex">
                  {/* Phone Number */}
                  <div className="mr-4 w-1/2">
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phonenumber"
                      type="text"
                      placeholder="Phone Number"
                      value={phonenumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                    />
                  </div>

                  {/* NMC Number */}
                  <div className="w-1/2">
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nmcnumber"
                      type="text"
                      placeholder="NMC Number"
                      value={nmcnumber}
                      onChange={(e) => setNmcnumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-6 relative flex">
                  <input
                    className="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                    id="password"
                    type="text"
                    placeholder="Password"
                    value={password}
                    //readOnly
                  />
                  <button
                    className="ml-3 bg-white text-lime-500 hover:bg-lime-500 hover:text-white py-2 px-3 border border-lime-500 focus:outline-none focus:shadow-outline transition duration-300"
                    type="button"
                    onClick={generateRandomPassword}
                  >
                    Generate
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    type="submit"
                  >
                    Add Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateDoctor;
