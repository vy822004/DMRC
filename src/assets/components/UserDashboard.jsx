import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-red-700 text-white py-4 shadow">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">दिल्ली मेट्रो रेल कॉर्पोरेशन लिमिटेड</h1>
            <p className="text-sm">Delhi Metro Rail Corporation LTD.</p>
          </div>
          <p className="text-sm">User Dashboard</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Welcome to the Vendor Dashboard</h2>
          <p className="text-gray-700">
            Here you can access and manage your application forms, check application statuses, and view important vendor guidelines from DMRC.
          </p>
        </section>

        {/* Application Summary */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-red-700 mb-4">Application Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <Link to="/applications?filter=total" className="bg-gray-100 p-4 rounded hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Total Submitted</p>
              <p className="text-xl font-bold text-red-600"></p>
            </Link>
            <Link to="/applications?filter=pending" className="bg-gray-100 p-4 rounded hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold text-yellow-500"></p>
            </Link>
            <Link to="/applications?filter=approved" className="bg-gray-100 p-4 rounded hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-xl font-bold text-green-600"></p>
            </Link>
            <Link to="/applications?filter=rejected" className="bg-gray-100 p-4 rounded hover:shadow-lg transition">
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-xl font-bold text-red-500"></p>
            </Link>
          </div>
        </section>

        {/* Vendor Guidelines */}
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-red-700 mb-3">Vendor Guidelines</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Include department and item code in the subject of your email to DMRC.</li>
            <li>Submit all mandatory documents in PDF format.</li>
            <li>Track application status regularly through this dashboard.</li>
            <li>For queries, contact <a href="mailto:vendor@dmrc.org" className="text-blue-600 underline">vendor@dmrc.org</a></li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-6 text-center text-sm">
        © 2025 DMRC. All Rights Reserved
      </footer>
    </div>
  );
};

export default UserDashboard;
