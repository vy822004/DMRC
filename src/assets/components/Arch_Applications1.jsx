// Arch_Applications.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Arch_Applications1() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost/DMRC/archdashboard2.php')
      .then((res) => {
        if (res.data.success) {
          const { totalCount, pendingCount, approvedCount, rejectedCount } = res.data;
          setStats({
            total: totalCount || 0,
            pending: pendingCount || 0,
            approved: approvedCount || 0,
            rejected: rejectedCount || 0,
          });
        } else {
          setError(res.data.message || 'Failed to load stats.');
        }
      })
      .catch(() => {
        setError('Error fetching dashboard data.');
      });
  }, []);

  const handleCardClick = (filterType) => {
    navigate(`/application/architecture1/list?filter=${filterType}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white p-5">
        <div className="flex items-center gap-3 mb-10">
          <img src="/Metro.png" alt="DMRC Logo" className="w-10" />
          <h2 className="text-xl font-bold">DMRC</h2>
        </div>
        <nav>
          <button
            className={`block w-full text-left py-2 px-3 mb-2 rounded ${
              activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left py-2 px-3 mb-2 rounded hover:bg-blue-700"
            onClick={() => navigate('/application/architecture')}
          >
            Applications
          </button>
          <button
            className={`block w-full text-left py-2 px-3 mb-2 rounded ${
              activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-6">
        <header className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img src="/Metro.png" alt="Logo" className="w-10" />
            <h1 className="text-2xl font-bold">Architecture Admin Panel</h1>
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

        {activeTab === 'dashboard' && (
          <>
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Applications', value: stats.total, color: 'text-blue-600', filter: 'total' },
                { label: 'Pending', value: stats.pending, color: 'text-yellow-500', filter: 'pending' },
                { label: 'Approved', value: stats.approved, color: 'text-green-600', filter: 'approved' },
                { label: 'Rejected', value: stats.rejected, color: 'text-red-500', filter: 'rejected' },
              ].map((card, i) => (
                <div
                  key={i}
                  onClick={() => handleCardClick(card.filter)}
                  className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
                >
                  <div className="text-gray-500 text-sm mb-1">{card.label}</div>
                  <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Admin Settings</h2>
            <div className="bg-white rounded shadow p-4 space-y-4">
              <div>
                <label className="block font-medium mb-1">Admin Name</label>
                <input className="w-full border p-2 rounded" defaultValue="DMRC Admin" />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  defaultValue="admin@dmrc.in"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Department</label>
                <select className="w-full border p-2 rounded" defaultValue="Architecture">
                  <option>Electrical</option>
                  <option>Civil</option>
                  <option>Architecture</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
