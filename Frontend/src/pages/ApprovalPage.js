import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../config/api';
import './css/ApprovalPage.css';

const ApprovalPage = () => {
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [requests, setRequests] = useState([]);

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

  const filteredRequests = statusFilter === 'All'
    ? requests
    : requests.filter(req => req.status === statusFilter);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const getFirstName = (fullName) => fullName.split(" ")[0];

  const handleToggleStatus = async (id) => {
    try {
      await api.patch(`/requests/${id}`, { status: 'Approved' });
      setRequests(requests.map(req => 
        req._id === id ? { ...req, status: 'Approved' } : req
      ));
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  return (
    <div className="container">
      <Header />
      <main className="approval-main">
        <div className="approval-content">
          <h2>Approval Requests</h2>

          <div className="filter-container">
            <label htmlFor="status-select">Select Status</label>
            <select
              id="status-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>

          <div className="approval-table-container">
            <table className="approval-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Emp Name</th>
                  <th>Request Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map((req, index) => (
                  <tr key={req._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{getFirstName(req.type)}</td>
                    <td>{req.reason}</td>
                    <td>
                      {req.status === 'Pending' ? (
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={() => handleToggleStatus(req._id)}
                          />
                          <span className="slider round"></span>
                        </label>
                      ) : (
                        <span className="approved-text">Approved ✅</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                className={currentPage === num ? "active" : ""}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApprovalPage;
