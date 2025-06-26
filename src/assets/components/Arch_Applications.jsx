import React, { useEffect, useState } from "react";

const Arch_Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost/DMRC/get_arch_forms.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setApplications(data.data);
        } else {
          console.error("Server Error:", data.message);
        }
      })
      .catch((err) => console.error("Error fetching arch forms:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Architectural Applications</h1>
      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.Application_id} className="border p-4 rounded-lg shadow-md">
              <p><strong>ID:</strong> {app.Application_id}</p>
              <p><strong>Incorporation Date:</strong> {app.incorporation_date}</p>
              <p><strong>Manufacturing Years:</strong> {app.manufacturing_years}</p>
              <p><strong>Material Origin:</strong> {app.material_origin}</p>
              <p><strong>Production Capacity:</strong> {app.production_capacity}</p>
              <p><strong>Lifespan:</strong> {app.lifespan ?? 'N/A'}</p>
              <p><strong>IS Code:</strong> {app.is_code ?? 'N/A'}</p>

              {app.is_code_file && (
                <p>
                  <strong>IS Code File:</strong>{" "}
                  <a
                    href={`http://localhost/DMRC/uploads/${app.is_code_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                </p>
              )}

              <p><strong>ISO Certified:</strong> {app.iso_certified ? "Yes" : "No"}</p>

              {app.iso_file && (
                <p>
                  <strong>ISO File:</strong>{" "}
                  <a
                    href={`http://localhost/DMRC/uploads/${app.iso_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                </p>
              )}

              <p><strong>Application Area:</strong> {app.application_area}</p>
              <p><strong>Used in DMRC:</strong> {app.used_in_dmrc ? "Yes" : "No"}</p>

              {app.dmrc_proof_file && (
                <p>
                  <strong>DMRC Proof File:</strong>{" "}
                  <a
                    href={`http://localhost/DMRC/uploads/${app.dmrc_proof_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                </p>
              )}

              <p><strong>Submitted At:</strong> {app.created_at}</p>

              <div className="flex gap-4 mt-4">
                <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                  Approve
                </button>
                <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Arch_Applications;
