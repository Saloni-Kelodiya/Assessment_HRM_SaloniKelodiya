import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../config/api'; // ensure this is imported

function RequestForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState("leave");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post('/requests', {
      employeeId: id,
      type,
      description,
    });
    navigate(`/employee/${id}`);
  } catch (error) {
    console.error('Failed to submit request:', error);
    alert('Failed to submit request. Please try again.');
  }
};

  return (
    <div>
      <h2>Raise a Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Request Type</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="leave">Leave</option>
            <option value="project-change">Project Change</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default RequestForm;
