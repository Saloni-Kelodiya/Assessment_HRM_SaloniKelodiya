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
  const [loading, setLoading] = useState(false);

  // Fetch requests from DB
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await api.get('/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        alert('Failed to fetch requests.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Filter and paginate
  const filteredRequests = statusFilter === 'All'
    ? requests
    : requests.filter(req => req.status === statusFilter);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  // Toggle approval status
 const handleToggleStatus = async (id, currentStatus) => {
  try {
    const newStatus = currentStatus === 'Pending' ? 'Approved' : 'Pending';
    const response = await api.patch(`/requests/${id}`, { status: newStatus });
    setRequests(requests.map(req =>
      req._id === id ? { ...req, status: response.data.status } : req
    ));
  } catch (error) {
    console.error('Error updating request status:', error);
    alert('Failed to update request status.');
  }
};



  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <div className="approval-content">
          <h2>Approval Requests</h2>

          <div className="filter-container">
            <label htmlFor="status-select">Filter by Status:</label>
            <select
              id="status-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="All">All</option>
            </select>
          </div>

          {loading ? (
            <p>Loading requests...</p>
          ) : paginatedRequests.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            <table className="approval-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Request Type</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map((req, index) => (
                  <tr key={req._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{req.type}</td>
                    <td>{req.reason}</td>
                   <td>
  <label className="switch">
    <input
  type="checkbox"
  size='small'
  checked={req.status === 'Approved'}
  onChange={() => handleToggleStatus(req._id, req.status)}
/>

    <span className="slider round"></span>
  </label>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApprovalPage;
