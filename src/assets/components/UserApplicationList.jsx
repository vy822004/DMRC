import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UserApplicationList = () => {
  const query = useQuery();
  const filter = query.get("filter") || "total";
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    axios
      .get(`http://localhost/DMRC/get_user_applications.php`, {
        params: {
          user_id: userId,
          filter: filter
        },
      })
      .then((res) => {
        if (res.data.success) {
          setApplications(res.data.data);
        } else {
          setApplications([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        setApplications([]);
        setLoading(false);
      });
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-red-700 text-white py-4 shadow">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">दिल्ली मेट्रो रेल कॉर्पोरेशन लिमिटेड</h1>
            <p className="text-sm">Delhi Metro Rail Corporation LTD.</p>
          </div>
          <p className="text-sm capitalize">Vendor Applications – {filter}</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-red-700 mb-4">
          Your {filter.charAt(0).toUpperCase() + filter.slice(1)} Applications
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-500">No applications found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {applications.map((app) => (
              <div key={app.Application_id} className="bg-white rounded shadow p-4">
                <p className="text-gray-600 text-sm">ID: {app.Application_id}</p>
                <p className="font-semibold text-lg">{app.department}</p>
                
                <p className="text-sm mt-1">
                  Status: 
                  <span className={
                    app.status === "approved" ? "text-green-600" :
                    app.status === "rejected" ? "text-red-500" :
                    "text-yellow-500"
                  }>
                    {" " + app.status}
                  </span>
                </p>

                {app.status === "rejected" && app.remark && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Remark:</span> {app.remark}
                  </p>
                )}

                
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserApplicationList;
