import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./css/EmployeeRequests.css"


const EmployeeRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, type: "Leave", reason: "Medical Leave", status: "Approved" },
    { id: 2, type: "Project Change", reason: "Want to switch project", status: "Disapproved" },
  ]);

  const [newRequest, setNewRequest] = useState({ type: "Leave", reason: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newRequest.reason.trim()) return;
    setRequests([
      ...requests,
      { id: Date.now(), ...newRequest, status: "Pending" }
    ]);
    setNewRequest({ type: "Leave", reason: "" });
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
            <li key={req.id} className={`request-item ${req.status.toLowerCase()}`}>
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
