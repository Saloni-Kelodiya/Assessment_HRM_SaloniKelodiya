import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../config/api"; // Axios instance with baseURL
import "./css/EmployeeRequests.css";

const EmployeeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ type: "Leave", reason: "" });
  const [loading, setLoading] = useState(false);

  // Fetch requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await api.get("/requests"); // calls https://.../api/requests
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        alert("Failed to fetch requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Submit new request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRequest.reason.trim()) {
      alert("Please enter a reason for the request.");
      return;
    }

    try {
      const response = await api.post("/requests", newRequest); // POST to backend
      setRequests([response.data, ...requests]); // add new request at top
      setNewRequest({ type: "Leave", reason: "" }); // reset form
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  // Utility to get CSS class for status
  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "approved";
      case "Disapproved":
        return "disapproved";
      default:
        return "pending";
    }
  };

  return (
    <div className="employee-dashboard-container">
      <Header />
      <main className="employee-requests-main">
        <h2>📝 Raise a Request</h2>
        <p className="welcome-text">Submit a leave or project change request.</p>

        <form onSubmit={handleSubmit} className="request-form">
          <select
            value={newRequest.type}
            onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
            required
          >
            <option value="Leave">Leave Request</option>
            <option value="Project Change">Project Change</option>
          </select>

          <textarea
            placeholder="Enter reason..."
            value={newRequest.reason}
            onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
            required
          />

          <button type="submit">Submit Request</button>
        </form>

        <h3 style={{ marginTop: "30px" }}>📌 Your Requests</h3>

        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length === 0 ? (
          <p>No requests submitted yet.</p>
        ) : (
          <ul className="request-list">
            {requests.map((req) => (
              <li key={req._id} className={`request-item ${getStatusClass(req.status)}`}>
                <strong>{req.type}:</strong> {req.reason}  
                <span className="status">[{req.status}]</span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeRequests;
