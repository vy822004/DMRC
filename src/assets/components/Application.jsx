import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Application = () => {
  const { department } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    itemCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${department.toUpperCase()}!`);
  };

  const deptLabel =
    department.charAt(0).toUpperCase() + department.slice(1);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-red-700 text-white px-6 py-4 text-xl font-bold">
        दिल्ली मेट्रो रेल कॉर्पोरेशन लिमिटेड &nbsp;|&nbsp; Delhi Metro Rail Corporation LTD.
      </header>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-gray-50 shadow-xl p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-2 text-center text-red-700">
            {deptLabel} Department Vendor Application
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Submit your application for empanelment with proper department and item code.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="itemCode"
              placeholder="Item Code (e.g. C23)"
              value={formData.itemCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-red-700 text-white font-semibold py-2 rounded-md hover:bg-red-800 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] text-white py-6 px-4 grid sm:grid-cols-3 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Contact Information</h4>
          <p>Metro Bhawan Fire Brigade Lane,<br />
            Barakhamba Road,<br />
            New Delhi – 110001, India<br />
            EPABX - 011-23417910/11/12</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul>
            <li>Dust Control Measures</li>
            <li>Vendor Payment Details</li>
            <li>Customer Payment Link</li>
            <li>List Of MD Awardees</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">More Info</h4>
          <ul>
            <li>Public Notice</li>
            <li>Procurement Information</li>
            <li>Public Grievances</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Application;
