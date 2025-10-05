import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/ApprovalPage.css';

const ApprovalPage = () => {
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dummy approval requests
  const [dummyRequests, setDummyRequests] = useState([
    { sr: 1, empName: 'Ashish Sharma', request: 'Leave A', status: 'Pending' },
    { sr: 2, empName: 'Priya Singh', request: 'Leave B', status: 'Approved' },
    { sr: 3, empName: 'Rahul Jain', request: 'Leave C', status: 'Pending' },
    { sr: 4, empName: 'Anjali Gupta', request: 'Leave D', status: 'Approved' },
    { sr: 5, empName: 'Vikram Yadav', request: 'Leave E', status: 'Pending' },
  ]);

  const filteredRequests = statusFilter === 'All'
    ? dummyRequests
    : dummyRequests.filter(req => req.status === statusFilter);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const getFirstName = (fullName) => fullName.split(" ")[0];

  // Toggle Pending -> Approved
  const handleToggleStatus = (sr) => {
    const updatedRequests = dummyRequests.map(req => {
      if (req.sr === sr && req.status === 'Pending') {
        return { ...req, status: 'Approved' };
      }
      return req;
    });
    setDummyRequests(updatedRequests);
  };

  return (
    <div className="container">
      <Header />
      <main className="approval-main">
        <div className="approval-content">
          <h2>Approval Requests</h2>

          {/* Status Filter */}
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

          {/* Approval Table */}
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
                {paginatedRequests.map(req => (
                  <tr key={req.sr}>
                    <td>{req.sr}</td>
                    <td>{getFirstName(req.empName)}</td>
                    <td>{req.request}</td>
                    <td>
                      {req.status === 'Pending' ? (
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={() => handleToggleStatus(req.sr)}
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

          {/* Pagination */}
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
