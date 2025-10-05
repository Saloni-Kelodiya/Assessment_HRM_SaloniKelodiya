import React, { useEffect, useState } from "react";
import axios from "axios";
import api from '../config/api'; // ensure this is imported

function HRDashboard() {
  const [requests, setRequests] = useState([]);

 useEffect(() => {
  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests'); // no localhost
      setRequests(res.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  fetchRequests();
}, []);


 const updateStatus = async (id, status) => {
  try {
    await api.put(`/requests/${id}`, { status });
    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
  } catch (error) {
    console.error('Failed to update status:', error);
    alert('Failed to update request status. Please try again.');
  }
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
