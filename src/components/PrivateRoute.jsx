import React from 'react';

const ProtectedRoute = ({ children }) => {
  // Bypass token check — always allow access
  return children;
};

export default ProtectedRoute;