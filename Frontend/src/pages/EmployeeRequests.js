import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../config/api"; // Axios instance
import "./css/EmployeeRequests.css";

const EmployeeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ type: "Leave", reason: "" });
  const [loading, setLoading] = useState(false);

  // Fetch existing requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await api.get("/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Handle submitting a new request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newRequest.reason.trim()) {
      alert("Please enter a reason for the request.");
      return;
    }

    try {
      const response = await api.post("/requests", newRequest);
      // Add new request at the top
      setRequests([response.data, ...requests]);
      // Reset form
      setNewRequest({ type: "Leave", reason: "" });
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
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
              <li key={req._id} className={`request-item ${req.status.toLowerCase()}`}>
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
