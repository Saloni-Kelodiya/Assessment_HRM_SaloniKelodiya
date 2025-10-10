import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./css/EmployeeDashboard.css";
import api from "../config/api";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchCode, setSearchCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await api.get("/employee/all");
        if (res.data.success) {
          setEmployees(res.data.employees);
          if (res.data.employees.length > 0) {
            setSelectedEmployee(res.data.employees[0]); // default first
          }
          setError(null);
        } else {
          setError("Failed to fetch employees");
        }
      } catch (err) {
        setError("Error fetching employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (e) => {
    const code = e.target.value;
    setSearchCode(code);

    if (!code) {
      setSelectedEmployee(employees[0] || null);
      return;
    }

    const emp = employees.find(
      (emp) => emp.code?.toLowerCase() === code.toLowerCase()
    );
    setSelectedEmployee(emp || null);
  };

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <h2>👋 Welcome to Employee Dashboard</h2>
        <p className="welcome-text">Manage and explore employee details with ease.</p>

        {/* Search */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="OS2510001 exp."
            value={searchCode}
            onChange={handleSearchChange}
          />
        </div>

        {/* Loading */}
        {loading && <div className="loading">Loading employees...</div>}

        {/* Error */}
        {error && <div className="error">{error}</div>}

        {/* Employee Card */}
        {!loading && !error && selectedEmployee ? (
          <div className="employee-card">
            <h3>{selectedEmployee.name}</h3>
            <p><strong>Code:</strong> {selectedEmployee.code}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <p><strong>Department:</strong> {selectedEmployee.dept}</p>
            <p><strong>Project:</strong> {selectedEmployee.project || selectedEmployee.proj}</p>

            {/* Raise Request Button */}
            <button 
              className="raise-request-btn"
              onClick={() => navigate("/employee/requests")}
            >
              ➕ Raise Request
            </button>
          </div>
        ) : (
          !loading && !error && (
            <p className="no-employee">No employee found with this code.</p>
          )
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeDashboard;
