import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVBAR_LOGO } from '../utils/constants';
import { MdOutlineDashboard, MdLandscape, MdOutlinePersonAddAlt } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSliderHorizontal } from "react-icons/ci";
import { IoIosNotifications, IoIosSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Toggle button - mobile only */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-3xl text-gray-700 bg-white p-2 rounded shadow">
          {isOpen ? <RxCross2 /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black opacity-30 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav className={`bg-white text-gray-900 h-full fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0 lg:w-70' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen w-20  shadow`}>

        {/* Logo + Title */}
        <div className='flex items-center justify-center lg:justify-between px-2 lg:px-6 py-6 border-b'>
          <img className="w-10 lg:w-20" src={NAVBAR_LOGO} alt="logo" />
          <h1 className='hidden lg:block text-lg font-bold'>Rental Surat</h1>
        </div>

        {/* Sidebar links */}
        <ul className="mt-6">
          <SidebarItem to="/" icon={<MdOutlineDashboard />} label="Dashboard" />
          <SidebarItem to="/usermanagement" icon={<FaRegUserCircle />} label="User Management" />
          <SidebarItem to="/propertymanagement" icon={<MdLandscape />} label="Property Management" />
          <SidebarItem to="/inactive-requext" icon={<MdOutlinePersonAddAlt />} label="Listing/Inactive Request" />
          <SidebarItem to="/slide-manager" icon={<CiSliderHorizontal />} label="Slider Management" />
          <SidebarItem to="/notification" icon={<IoIosNotifications />} label="Notification" />
          <SidebarItem to="/settings" icon={<IoIosSettings />} label="Settings" />
        </ul>

        {/* Logout button */}
        <div className="mt-25 lg:bottom-6 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-3 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white w-full"
          >
            <span className="text-2xl">
              <RxCross2 />
            </span>
            <span className="hidden lg:inline font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

// Sidebar Item component
const SidebarItem = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-4 px-3 py-3 m-3 mx-2 rounded-xl hover:bg-yellow-500 
          ${isActive ? 'text-green-50 font-semibold bg-green-800' : 'text-gray-800'}`
        }
      >
        <span className="text-2xl">{icon}</span>
        <span className="hidden lg:inline font-semibold">{label}</span>
      </NavLink>
    </li>
  );
};

export default Navbar;