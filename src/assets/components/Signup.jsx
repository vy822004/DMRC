import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    contact_id: "",
    pan_id: "",
    gstin: "",
    legal_structure: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const {
      company_name,
      contact_id,
      pan_id,
      gstin,
      legal_structure,
      email,
      password,
      confirmPassword
    } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost/DMRC/sign_up.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name,
          contact_id,
          pan_id,
          gstin,
          legal_structure,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registration successful!");
        navigate("/otp", { state: { from: "signup", email } });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6 text-center">
          <img src="/Metro.png" alt="Logo" className="h-12 w-12 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            DMRC <span className="block">VENDORS</span>
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <input type="text" name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="number" name="contact_id" placeholder="Contact ID" value={formData.contact_id} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="text" name="pan_id" placeholder="PAN ID" value={formData.pan_id} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="text" name="gstin" placeholder="GSTIN" value={formData.gstin} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="text" name="legal_structure" placeholder="Legal Structure" value={formData.legal_structure} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-red-700">
            Register
          </button>

          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-red-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
