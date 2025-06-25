import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import darkLogo from '/src/assets/darkModeLogo.png';
import logo from '/src/assets/logo-with-tag.svg';
import { MdOutlineDashboard, MdLandscape, MdOutlinePersonAddAlt } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSliderHorizontal } from "react-icons/ci";
import { IoIosNotifications, IoIosSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => setIsOpen(prev => !prev);
const navigate = useNavigate();
  useEffect(() => {
    
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width >= 1024) {
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
  navigate('/login'); // from useNavigate()
};

  return (
    <>
      {/* Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-60">
        <button onClick={toggleSidebar} className="text-3xl text-gray-700 dark:text-white bg-white dark:bg-gray-700 p-2 rounded shadow">
          {isOpen ? <RxCross2 /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && windowWidth < 1024 && (
        <div className="fixed inset-0 bg-black opacity-30 z-40" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <nav
        className={`w-20 fixed top-0 left-0 z-50 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white
        min-h-screen transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
         lg:w-65 lg:translate-x-0 shadow-2xl overflow-y-auto lg:static`}
        aria-label='sidebar navigation'
      >
        {/* Logo */}
        <div className='flex items-center justify-center lg:justify-between px-4 py-6 border-b dark:border-gray-600'>
          <img
            className="w-15 lg:w-20 dark:lg:w-20"
            src={darkMode ? darkLogo : logo}
            alt="logo"
          />
          <h1 className='hidden lg:block text-lg font-bold'>Real Estate</h1>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-6">
          <SidebarItem to="/" icon={<MdOutlineDashboard />} label="Dashboard" onClick={windowWidth < 1024 ? toggleSidebar : undefined} />
          <SidebarItem to="/usermanagement" icon={<FaRegUserCircle />} label="User Management" onClick={windowWidth < 1024 ? toggleSidebar : undefined} />
          <SidebarItem to="/propertymanagement" icon={<MdLandscape />} label="Property Management" onClick={windowWidth < 1024 ? toggleSidebar : undefined} />
          <SidebarItem to="/inactive-requext" icon={<MdOutlinePersonAddAlt />} label="Listing/Inactive Request" onClick={windowWidth < 1024 ? toggleSidebar : undefined} />
          <SidebarItem to="/slide-manager" icon={<CiSliderHorizontal />} label="Slider Management" onClick={windowWidth < 1024 ? toggleSidebar : undefined} />
          <SidebarItem to="/notification" icon={<IoIosNotifications />} label="Notification" onClick={windowWidth < 1024 ? toggleSidebar : undefined} />
          <SidebarItem to="/settings" icon={<IoIosSettings />} label="Settings" onClick={windowWidth < 1024 ? toggleSidebar : undefined} />
        </ul>

        {/* Logout Button */}
        <div className="mt-50 lg:mt-30 w-full px-4 dark:mt-28">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-3 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white w-full"
          >
            <span className="text-2xl"><RxCross2 /></span>
            <span className="hidden lg:inline font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

const SidebarItem = ({ to, icon, label, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-4 px-3 py-3 m-3 mx-2 rounded-xl transition 
          hover:bg-yellow-500 dark:hover:bg-yellow-600 
          ${isActive ? 'text-white font-semibold bg-green-800' : 'text-gray-800 dark:text-gray-100'}`
        }
      >
        <span className="text-2xl">{icon}</span>
        <span className="hidden lg:inline font-semibold">{label}</span>
      </NavLink>
    </li>
  );
};

export default Navbar;