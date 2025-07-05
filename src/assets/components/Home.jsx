import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const UserId = localStorage.getItem("UserId");
const role = localStorage.getItem("role");

const Home = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    const role = localStorage.getItem("role");

    if (role === "vendor") {
      navigate("/userdashboard");
    } else if (role === "elec_head") {
      navigate("/elec_applications");
    } else if (role === "elec_1") {
      navigate("/elec_applications1");
    }  else if (role === "elec_2") {
      navigate("/elec_applications2");
    } else if (role === "arch_head") {
      navigate("/arch_applications");
    } else if (role === "arch_1") {
      navigate("/arch_applications1");
    }  else if (role === "arch_2") {
      navigate("/arch_applications2");
    } else if (role === "head") {
      navigate("/head");
    }
     
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-red-700 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">दिल्ली मेट्रो रेल कॉर्पोरेशन लिमिटेड</h1>
            <p className="text-sm">Delhi Metro Rail Corporation LTD.</p>
          </div>
          <button
            onClick={handleDashboardClick}
            className="mt-2 sm:mt-0 bg-white text-red-700 font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* Main Notification */}
      <main className="flex-grow bg-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-800">
            Notification on DMRC Website regarding Directions for Vendor Empanelment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 mt-8">
            <a href="#" className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg shadow text-lg font-semibold transition">
              Civil
            </a>

            <Link to="/elecform" className="bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-lg shadow text-lg font-semibold transition">
              Electrical
            </Link>

            <Link to="/Archform" className="bg-teal-400 hover:bg-teal-500 text-black py-4 rounded-lg shadow text-lg font-semibold transition">
              Architecture
            </Link>
          </div>

          <p className="text-red-600 font-medium">
            Vendors are advised to include the name of the concerned department and the item code (S. No.) in the email subject when submitting the vendor application form to <a href="mailto:vendor@dmrc.org" className="underline">vendor@dmrc.org</a> for empanelment.
            <br />
            For example: <span className="font-semibold">[CIVIL C23], [ELECTRICAL E14], [ARCHITECTURE A9]</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">Contact Information</h3>
            <p>
              Metro Bhawan Fire Brigade Lane,<br />
              Barakhamba Road,<br />
              New Delhi – 110001, India<br />
              EPABX - 011-23417910/11/12
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>Dust Control Measures</li>
              <li>Vendor Payment Details</li>
              <li>Customer Payment Link</li>
              <li>List Of MD Awardees</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">More Info</h3>
            <ul className="space-y-1">
              <li>Public Notice</li>
              <li>Procurement Information</li>
              <li>Public Grievances</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">© 2025 DMRC. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
