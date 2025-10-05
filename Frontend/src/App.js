import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddEmployeePage from './pages/AddEmployeePage';
import ManageEmployeePage from './pages/ManageEmployeePage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeeRequests from './pages/EmployeeRequests';
import ApprovalPage from './pages/ApprovalPage';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

const RoleBasedManageEmployee = () => {
  const { role } = useAuth();

  if (role === 'HR') {
    return <ManageEmployeePage />;
  } else if (role === 'Employee') {
    return <EmployeeDashboard />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/add-employee"
              element={
                <ProtectedRoute allowedRoles={['HR']}>
                  <AddEmployeePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-employee"
              element={
                <ProtectedRoute allowedRoles={['HR', 'Employee']}>
                  <RoleBasedManageEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/requests"
              element={
                <ProtectedRoute allowedRoles={['Employee']}>
                  <EmployeeRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/approval"
              element={
                <ProtectedRoute allowedRoles={['HR']}>
                  <ApprovalPage />
                </ProtectedRoute>
              }
            />
            
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
