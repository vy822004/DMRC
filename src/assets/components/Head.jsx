import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Head() {
  const navigate = useNavigate();

  const departments = [
    {
      name: 'Architecture',
      description: 'Review submitted architectural forms and approve or reject submissions. Coordinate with vendors on compliance and documentation.',
      route: '/Arch_Applications',
    },
    {
      name: 'Civil',
      description: 'Manage civil infrastructure reports, monitor project progress, and validate quality standards as per DMRC norms.',
    },
    {
      name: 'Electrical',
      description: 'Oversee electrical component integration, safety compliance, and power systems documentation.',
    },
    
  ];

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
            className="block w-full text-left py-2 px-3 mb-2 rounded bg-blue-600"
            disabled
          >
            Department Head
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-6">
        <header className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img src="/Metro.png" alt="Logo" className="w-10" />
            <h1 className="text-2xl font-bold">DMRC Department Head Portal</h1>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800">
          {departments.map((dept, i) => (
            <div key={i} className="bg-white p-5 border rounded shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-[#c8102e]">{dept.name}</h2>
              <p className="text-sm mb-3">{dept.description}</p>
              {dept.route && (
                <button
                  onClick={() => navigate(dept.route)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Open
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
