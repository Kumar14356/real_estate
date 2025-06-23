import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import DashBoard from './components/dashBoard/DashBoard';
import UserManagement from './components/userManagement/UserManagement';
import PropertyManagementPage from './components/propertyManagement/PropertyManagementPage';
import InactiveRequext from './components/InactiveRequext';
import SlideManager from './components/sliderManagemt/SlideManager';
import Notification from './components/Notification/Notification';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import Navbar from './components/Navbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <div className="flex">
      {isAuthenticated && <Navbar />}

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="app flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
          <Route path="/usermanagement" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
          <Route path="/propertymanagement" element={<PrivateRoute><PropertyManagementPage /></PrivateRoute>} />
          <Route path="/inactive-requext" element={<PrivateRoute><InactiveRequext /></PrivateRoute>} />
          <Route path="/slide-manager" element={<PrivateRoute><SlideManager /></PrivateRoute>} />
          <Route path="/notification" element={<PrivateRoute><Notification /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;