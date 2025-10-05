import React, { useEffect, useState } from "react";
import axios from "axios";

function HRDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/requests")
      .then((res) => setRequests(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/requests/${id}`, { status });
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  };

  return (
    <div>
      <h2>HR Dashboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.employeeId}</td>
              <td>{req.type}</td>
              <td>{req.description}</td>
              <td>{req.status}</td>
              <td>
                {req.status === "Pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(req._id, "Approved")}
                      className="btn btn-sm btn-success me-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(req._id, "Rejected")}
                      className="btn btn-sm btn-danger"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HRDashboard;
