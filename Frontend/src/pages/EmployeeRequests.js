import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../config/api"; // Your axios instance
import "./css/EmployeeRequests.css";

const EmployeeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({ type: "Leave", reason: "" });

  // Fetch existing requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRequest.reason.trim()) return;

    try {
      const response = await api.post('/requests', newRequest);
      setRequests([response.data, ...requests]);
      setNewRequest({ type: "Leave", reason: "" });
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="employee-dashboard-container">
      <Header />
      <main>
        <h2>📝 Raise a Request</h2>
        <p className="welcome-text">Submit a leave request or project change request.</p>

        <form onSubmit={handleSubmit} className="request-form">
          <select
            value={newRequest.type}
            onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
          >
            <option value="Leave">Leave Request</option>
            <option value="Project Change">Project Change</option>
          </select>

          <textarea
            placeholder="Enter reason..."
            value={newRequest.reason}
            onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
          />

          <button type="submit">Submit Request</button>
        </form>

        <h3 style={{ marginTop: "30px" }}>📌 Your Requests</h3>
        <ul className="request-list">
          {requests.map((req) => (
            <li key={req._id} className={`request-item ${req.status.toLowerCase()}`}>
              <strong>{req.type}:</strong> {req.reason}  
              <span className="status">[{req.status}]</span>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeRequests;
