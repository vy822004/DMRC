import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Application() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost/DMRC/get_arch_forms.php")
      .then(response => {
        setApplications(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white p-5">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/Metro.png"
            alt="DMRC Logo"
            className="w-10"
          />
          <h2 className="text-xl font-bold">DMRC</h2>
        </div>
        <nav>
          <button
            onClick={() => navigate('/arch_applications')}
            className="block w-full text-left py-2 px-3 mb-2 rounded hover:bg-blue-700"
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left py-2 px-3 mb-2 rounded bg-blue-600"
            disabled
          >
            Applications
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-6">
        {/* Header */}
        <header className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/Metro.png"
              alt="Logo"
              className="w-10"
            />
            <h1 className="text-2xl font-bold">Architecture Applications</h1>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/41.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span>DMRC Admin</span>
          </div>
        </header>

        {/* Table */}
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="text-center text-gray-600">No records found.</div>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">#</th>
                  <th className="text-left px-4 py-2">Application ID</th>
                  <th className="text-left px-4 py-2">Status 0</th>
                  <th className="text-left px-4 py-2">Status 1</th>
                  <th className="text-left px-4 py-2">Status 2</th>
                  <th className="text-left px-4 py-2">Submission Time</th>
                  <th className="text-left px-4 py-2">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app.total_id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td
                      className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                      onClick={() => {
                        navigate(`/application/architecture/${app.Application_id}`);
                        console.log("Navigating to:", app.Application_id);
                      }}
                    >
                      {app.Application_id}
                    </td>
                    <td className="px-4 py-2">{app.status0}</td>
                    <td className="px-4 py-2">{app.status1}</td>
                    <td className="px-4 py-2">{app.status2}</td>
                    <td className="px-4 py-2">{app.submission_time}</td>
                    <td className="px-4 py-2">{app.remarks || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
