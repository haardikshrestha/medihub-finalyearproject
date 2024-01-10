import React from 'react';

const CreateDoctor = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
            type="button"
          >
            Add Doctor
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default CreateDoctor;
