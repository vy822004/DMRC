// ArchApplicationList.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function ArchApplicationList() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const filter = query.get("filter") || "total";

  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost/DMRC/archdashboard1.php?filter=${filter}`)
      .then((res) => {
        if (res.data.success) {
          setApplications(res.data.data || []);
        } else {
          setError(res.data.message || "Failed to fetch applications.");
        }
      })
      .catch(() => {
        setError("Error fetching applications.");
      });
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize">{filter} Applications</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back
        </button>
      </div>

      {error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Application ID</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Status 0</th>
                <th className="py-2 px-4 border-b">Status 1</th>
                <th className="py-2 px-4 border-b">Status 2</th>
                <th className="py-2 px-4 border-b">Submission Time</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.total_id || app.Application_id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-blue-600 underline">
                    <Link to={`/application/architecture/${app.Application_id}`}>
                      {app.Application_id}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">{app.department}</td>
                  <td className="py-2 px-4 border-b">{app.status0}</td>
                  <td className="py-2 px-4 border-b">{app.status1}</td>
                  <td className="py-2 px-4 border-b">{app.status2}</td>
                  <td className="py-2 px-4 border-b">{app.submission_time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {applications.length === 0 && (
            <div className="p-4 text-center text-gray-500">No applications found.</div>
          )}
        </div>
      )}
    </div>
  );
}
