import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../utils/themeSlice';
import { Moon, Sun } from 'lucide-react';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [username, setUsername] = useState("Admin");
  const [email, setEmail] = useState("admin@example.com");

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
      <div className="w-full max-w-4xl m-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl">
        <header className="flex justify-between items-center p-4 dark:bg-gray-700 shadow-sm">
          <h2 className="text-2xl font-semibold flex items-center gap-2">⚙️ Account Settings</h2>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>Appearance</span>
          </button>
        </header>

        <main className="p-6">
          <div className="dark:bg-gray-700 shadow-md rounded-lg p-6 max-w-4xl mx-auto">
            <div className="mb-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">👤 Profile</button>
            </div>
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Language</label>
                <select className="w-full p-2 border dark:border-gray-600 rounded-md dark:bg-gray-600">
                  <option>English</option>
                </select>
              </div>
              <div className="flex items-end justify-end md:col-span-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                  💾 Save Profile
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;