import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "login";
  const email = location.state?.email || localStorage.getItem("otpEmail");

  const [enteredOtp, setEnteredOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const message =
    from === "signup"
      ? "We've sent an OTP to your registered email for signup."
      : "We've sent an OTP to your registered email for login.";

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!email || !enteredOtp) {
      alert("Missing email or OTP. Please try again.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost/DMRC/verify_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        alert("✅ OTP Verified Successfully!");
        localStorage.removeItem("otpEmail");

        // Redirect to dashboard or home
        navigate("/dashboard"); // Change to your destination
      } else {
        alert("❌ " + (data.message || "Invalid OTP"));
      }
    } catch (err) {
      setLoading(false);
      console.error("OTP verification error:", err);
      alert("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md sm:max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Enter OTP</h2>
        <p className="text-center text-sm text-gray-600 mb-6">{message}</p>

        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-600" : "bg-black"
            } text-white py-2 rounded-md hover:bg-red-700 transition text-sm sm:text-base`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
