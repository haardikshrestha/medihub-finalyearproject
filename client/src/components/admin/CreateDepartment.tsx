import { HiKey } from "react-icons/hi";

const CreateDepartment = () => {
  return (
    <form className="bg-white rounded-lg px-10 pt-6 pb-8 mb-4 mt-4">
      <div className="mb-6">
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="Full Name"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-6">
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phonenumber"
          type="text"
          placeholder="Phone Number"
        />
      </div>

      <div className="mb-6">
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email Address"
        />
      </div>

      <div className="mb-6 relative flex">
        <input
          className="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
          id="password"
          type="password"
          placeholder="Password"
        />
        <button
          className="ml-3 bg-white text-lime-500 hover:bg-lime-500 hover:text-white py-2 px-3 border border-lime-500 focus:outline-none focus:shadow-outline transition duration-300"
          type="button"
        >
          Generate
        </button>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          type="button"
        >
          Add Department
        </button>
      </div>
    </form>
  );
};

export default CreateDepartment;
