import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/ManageEmployeePage.css';
import api from '../config/api';
const departments = ['HRMS', 'Recruitment', 'Development', 'Account', 'Digital Marketing', 'Sales and Marketing'];
const ManageEmployeePage = () => {
   const [employees, setEmployees] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editDept, setEditDept] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Add this

// Initialize selected value
useEffect(() => {
  if (selectedEmployee) {
    setEditDept(selectedEmployee.dept);
  }
}, [selectedEmployee]);

  const itemsPerPage = 5;

  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      setLoading(true); // optional: show loading
      const res = await api.get('/employee/all'); // ✅ leading slash
      console.log('Employees response:', res.data); // Debug
      if (res.data.success) {
        setEmployees(res.data.employees);
        if (res.data.employees.length > 0) {
          setSelectedEmployee(res.data.employees[0]);
        }
      } else {
        console.error('Failed to fetch employees:', res.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchEmployees();
}, []);


  const filteredEmployees =
    selectedDept === 'All'
      ? employees
      : employees.filter((emp) => emp.dept === selectedDept);

  const departments = ['All', ...new Set(employees.map((emp) => emp.dept))];

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Update popup
  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  // Delete confirmation
  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log(`Employee deleted: ${selectedEmployee.code}`);
    setShowDeleteModal(false);
    setSelectedEmployee(null);
    // Here you should also call backend API to delete employee and refresh the list
  };

  // Dept change → reset page
  const handleDeptChange = (e) => {
    setSelectedDept(e.target.value);
    setCurrentPage(1);
  };

  // Extract only first name
  const getFirstName = (fullName) => fullName.split(' ')[0];

  return (
    <div className="container">
      <Header />
      <main className="manage-employee-main">
        <div className="manage-employee-box">
          <h2>MANAGE EMPLOYEE</h2>

          {/* Department Filter */}
          <div className="filter-container">
            <label htmlFor="dept-select">Select Dept.</label>
            <select
              id="dept-select"
              value={selectedDept}
              onChange={handleDeptChange}
            >
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Table */}
          <div className="employee-table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Dept.</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((emp, idx) => (
                  <tr key={emp.code}>
                    <td>{startIndex + idx + 1}</td>
                    <td>{getFirstName(emp.name)}</td>
                    <td>{emp.code}</td>
                    <td>{emp.dept}</td>
                    <td className="action-buttons">
                      <button
                        className="update-btn"
                        onClick={() => handleUpdate(emp)}
                      >
                        ✏️Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(emp)}
                      >
                        ❌Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={currentPage === num ? 'active' : ''}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Edit Modal */}
      {showEditModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Employee</h3>
            <p>
              Editing <strong>{selectedEmployee.name}</strong> (
              {selectedEmployee.code})
            </p>
            {/* Example form fields */}
            <input type="text" defaultValue={selectedEmployee.name} />
            <select type="text" value={editDept} onChange={e => setEditDept(e.target.value)}>
  <option value="">Select Department</option>
  {departments.map(dept => (
    <option key={dept} value={dept}>{dept}</option>
  ))}
</select>
            <div className="modal-actions">
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
              <button
                onClick={() => {
                  console.log('Updated', selectedEmployee.code);
                  setShowEditModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete{' '}
              <strong>{selectedEmployee.name}</strong> (
              {selectedEmployee.code})?
            </p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="delete-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmployeePage;
