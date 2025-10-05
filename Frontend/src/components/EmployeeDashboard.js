import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from '../config/api'; // make sure api.js is imported

function EmployeeDashboard() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch employee details
      const empRes = await api.get(`/employees/${id}`);
      setEmployee(empRes.data);

      // Fetch employee requests
      const reqRes = await api.get(`/requests/${id}`);
      setRequests(reqRes.data);
    } catch (err) {
      console.error('Error fetching employee data or requests:', err);
    }
  };

  fetchData();
}, [id]);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Employee Dashboard</h2>

      {employee ? (
        <div className="card shadow-sm p-4 mb-5 bg-white rounded">
          <h4 className="mb-3">{employee.name}</h4>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Project:</strong> {employee.project}</p>
        </div>
      ) : (
        <div>Loading employee details...</div>
      )}

      <h4 className="mb-3">My Requests</h4>
      {requests.length > 0 ? (
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.type}</td>
                <td>{req.description}</td>
                <td>
                  <span className={`badge ${
                    req.status === 'Approved' ? 'bg-success' :
                    req.status === 'Pending' ? 'bg-warning text-dark' :
                    req.status === 'Rejected' ? 'bg-danger' : 'bg-secondary'
                  }`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
}

export default EmployeeDashboard;
