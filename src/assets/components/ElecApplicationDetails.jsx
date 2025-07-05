import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ElecApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost/DMRC/get_elecform_details.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          setAppData(res.data.data);
        } else {
          setError(res.data.message || "No data found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching application data.");
        setLoading(false);
      });
  }, [id]);

  const handleApprove = () => {
    // Placeholder - you can connect to your backend here
    setActionMessage("Application approved successfully.");
  };

  const handleReject = () => {
    // Placeholder - you can connect to your backend here
    setActionMessage("Application rejected.");
  };

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
            onClick={() => navigate('/elec_applications')}
            className="block w-full text-left py-2 px-3 mb-2 rounded hover:bg-blue-700"
          >
            Dashboard
          </button>
          <button
            className="block w-full text-left py-2 px-3 mb-2 rounded bg-blue-600"
            disabled
          >
            Application Details
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-6">
        <header className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/Metro.png"
              alt="Logo"
              className="w-10"
            />
            <h1 className="text-2xl font-bold">Application Details - {id}</h1>
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

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="bg-white shadow rounded p-6">
            {actionMessage && (
              <div className="mb-4 text-green-600 font-semibold">{actionMessage}</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(appData).map(([key, value]) => {
                const isPdf = typeof value === 'string' && value.endsWith('.pdf');
                const fileUrl = `http://localhost/DMRC/uploads/electrical/${value}`;
                return (
                  <div key={key}>
                    <span className="text-gray-600 font-semibold capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <div className="text-gray-900">
                      {isPdf ? (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Open PDF
                        </a>
                      ) : (
                        value || "—"
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleApprove}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
