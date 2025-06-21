import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

import UserManagement from './components/userManagement/UserManagement';
import PropertyManagementPage from './components/propertyManagement/PropertyManagementPage';
import InactiveRequext from './components/InactiveRequext';
import SlideManager from './components/sliderManagemt/SlideManager';
import Notification from './components/Notification/Notification';
import Settings from './components/Settings';
import DashBoard from './components/dashBoard/DashBoard';
import Navbar from './components/Navbar';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🔐 PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  return (
    <Provider store={appStore}>
      <div className="flex justify-start">
        {/* ✅ Show navbar only when logged in */}
        {isAuthenticated && <Navbar />}

        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex-1">
          <Routes>
            {/* 🔓 Public Route */}
            <Route path="/login" element={<Login />} />

            {/* 🔒 Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/usermanagement"
              element={
                <PrivateRoute>
                  <UserManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/propertymanagement"
              element={
                <PrivateRoute>
                  <PropertyManagementPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/inactive-requext"
              element={
                <PrivateRoute>
                  <InactiveRequext />
                </PrivateRoute>
              }
            />
            <Route
              path="/slide-manager"
              element={
                <PrivateRoute>
                  <SlideManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <PrivateRoute>
                  <Notification />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
