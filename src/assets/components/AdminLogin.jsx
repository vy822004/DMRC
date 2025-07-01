import React from "react";
import Signup from "./Signup";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  return (
    <div className="bg-gray-200 min-h-screen w-full flex items-center justify-center px-4">
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-sm">
        <h3 className="text-2xl font-bold text-center text-white mb-4 bg-red-600 p-2 rounded-md shadow-md sm:mb-6">
          Admin </h3>

        <div className="flex items-center justify-center mb-6 text-center">
          <img
            src="/Metro.png"
            alt="Delhi Metro Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 mr-2"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
            DMRC <span className="block">VENDORS</span>
          </h1>
        </div>

        <form className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Email "
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-700 gap-2 sm:gap-0">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="text-red-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-red-700 transition text-sm sm:text-base"
          >
            Login
          </button>
           
          
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
