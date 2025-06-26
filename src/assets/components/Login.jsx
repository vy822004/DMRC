import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Step 1: Verify login credentials
      const loginResponse = await fetch("http://localhost/DMRC/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (loginData.success) {
        // Step 2: Send OTP to email
        const otpResponse = await fetch("http://localhost/DMRC/send_otp.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const otpData = await otpResponse.json();

        if (otpData.success) {
          // Save email for OTP verification
          localStorage.setItem("otpEmail", email);

          alert("OTP sent to your email.");
          navigate("/otp", {
            state: {
              from: "login",
              email,
            },
          });
        } else {
          alert("OTP Error: " + (otpData.message || "OTP not sent"));
        }
      } else {
        alert("Login failed: " + (loginData.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen w-full flex items-center justify-center px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-sm">
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

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              required
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

          <div className="w-full text-left text-gray-600 text-sm sm:text-base">
            <Link to="/Signup" className="text-red-600 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
