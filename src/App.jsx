import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { Provider } from 'react-redux';
import appStore from './Utils/appStore';

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

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};
const isLoggedIn = () => !!localStorage.getItem('token');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  // Listen for token changes (when user logs in or logs out)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  return (
    <Provider store={appStore}>
      <div className="flex justify-start">
        {/* Show navbar only when logged in */}
        {<Navbar />}
    <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex-1">
          <Routes>
            {/* Public Route */}
           

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                
                  <DashBoard />
                
              }
            />
            <Route
              path="/usermanagement"
              element={
             
                  <UserManagement />
              
              }
            />
            <Route
              path="/propertymanagement"
              element={
             
                  <PropertyManagementPage />
               
              }
            />
            <Route
              path="/inactive-requext"
              element={
             
                  <InactiveRequext />
               
              }
            />
            <Route
              path="/slide-manager"
              element={
               
                  <SlideManager />
                
              }
            />
            <Route
              path="/notification"
              element={
              
                  <Notification />
             
              }
            />
            <Route
              path="/settings"
              element={
             
                  <Settings />
               
              }
            />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;