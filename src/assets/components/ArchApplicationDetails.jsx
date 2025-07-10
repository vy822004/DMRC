import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArchApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [remarks, setRemarks] = useState("");

  const role = localStorage.getItem("role");
  const department = "Architecture";

  const editableRoles = ["arch_head", "arch_1", "arch_2"];
  const canUpdate = editableRoles.includes(role);

  useEffect(() => {
    axios
      .get(`http://localhost/DMRC/get_archform_details.php?id=${id}`)
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

  const updateStatus = (newStatus) => {
    const formData = new FormData();
    formData.append("application_id", id);
    formData.append("department", department);
    formData.append("role", role);
    formData.append("status", newStatus);
    formData.append("remarks", remarks || "");

    axios
      .post("http://localhost/DMRC/update_status.php", formData)
      .then((res) => {
        if (res.data.success) {
          setActionMessage(res.data.message);
          setError("");
        } else {
          setError(res.data.message || "Update failed");
          setActionMessage("");
        }
      })
      .catch(() => {
        setError("Failed to update status.");
        setActionMessage("");
      });
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
            onClick={() => navigate('/arch_applications')}
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
            <img src="/Metro.png" alt="Logo" className="w-10" />
            <h1 className="text-2xl font-bold">Application Details - {id}</h1>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/41.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span>DMRC Reviewer</span>
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
                const fileUrl = `http://localhost/DMRC/uploads/architecture/${value}`;
                return (
                  <div key={key}>
                    <span className="text-gray-600 font-semibold capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <div className="text-gray-900 break-words">
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

            {/* Remarks + Buttons */}
            {canUpdate && (
              <>
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1 font-medium">Remarks (optional):</label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full border rounded p-2"
                    rows="3"
                    placeholder="Add your remarks for approval/rejection..."
                  />
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => updateStatus("Approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus("Rejected")}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </>
            )}

            <div className="mt-6">
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
