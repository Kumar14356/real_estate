import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsToggles } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import ToggleButton from '../ToggleButton';
import { toogleUserInfo } from '../../utils/userSlice';
import { updateUserStatus } from '../../utils/ManagementSlice';
import { toast } from 'react-toastify';

const UserManageInfo = () => {
  const dispatch = useDispatch();
  const manageUser = useSelector((store) => store.manageUser.userInformation);
  const [isActive, setIsActive] = useState(manageUser?.isActive || false);

  useEffect(() => {
    setIsActive(manageUser?.isActive || false);
  }, [manageUser]);

  const closeUserInfo = () => dispatch(toogleUserInfo());

 const handleToggle = async (newStatus) => {
  setIsActive(newStatus);

  if (!manageUser?._id || manageUser._id.length !== 24) return;

  try {
    const response = await fetch(`https://realstate-2.onrender.com/api/v1/user/${manageUser._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isActive: String(newStatus) }), // 👈 send as "true" or "false"
    });

    if (!response.ok) throw new Error('Failed to update user status');
    
    
if (newStatus) {
  toast.success("User is now Active and ready to go!");
} else {
  toast.warning("User is Inactive. Peace and quiet for now!");
}
 
    dispatch(updateUserStatus({ userId: manageUser._id, isActive: newStatus }));
  } catch (error) {
    console.error('Error updating status:', error.message);
    toast.error('Error updating status:', error.message)
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 md:p-4 p-2">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-4 s,:p-6 relative border border-gray-200 dark:border-gray-700">
        <div
          className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-800 rounded-full p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          onClick={closeUserInfo}
        >
          ×
        </div>

        <div className="mb-4">
          <h1 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-gray-200">{manageUser?.username || "N/A"}</h1>
          <p className="text-sm sm:text-base">{manageUser?.broker === "Yes" ? "Broker" : "User"}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mx-2 mt-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl flex items-center gap-3 flex-1 shadow-sm justify-between">
            <div>
              <div className="text-xl flex items-center text-blue-400">
                <BsToggles />
                <span className="text-gray-600 dark:text-gray-200 text-sm px-2">Status</span>
              </div>
              <h3 className={`font-bold text-xl py-2 ${isActive ? 'text-green-800' : 'text-red-600'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </h3>
            </div>
            <ToggleButton initialState={isActive} onToggle={handleToggle} />
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl flex items-center gap-3 flex-1 shadow-sm justify-between">
            <div>
              <div className="text-xl flex items-center text-purple-600 dark:text-purple-400">
                <IoIosPeople />
                <span className=" text-sm px-2 text-gray-800 dark:text-gray-200 ">Role</span>
              </div>
              <h3 className="text-black font-medium text-xl py-2 dark:text-gray-200">
                {manageUser?.broker === "Yes" ? "Broker" : "User"}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mx-2 mt-4">
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl flex items-center gap-3 flex-1 shadow-sm justify-between">
            <div>
              <div className="text-xl flex items-center text-green-600 dark:text-green-400">
                <FaPhoneAlt />
                <span className="text-gray-800 dark:text-gray-200  text-sm px-2">Phone</span>
              </div>
              <h3 className="text-gray-800 dark:text-gray-200  font-medium text-xl py-2">{manageUser?.phone_no || "N/A"}</h3>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl flex items-center gap-3 flex-1 shadow-sm justify-between">
            <div>
              <div className="text-xl flex items-center text-red-900 dark-red-200">
                <IoMdAdd />
                <span className="text-gray-800 dark:text-gray-200  text-sm px-2">Email</span>
              </div>
              <h3 className="text-gray-800 dark:text-gray-200  font-medium text-xl py-2">{manageUser?.email || "N/A"}</h3>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md w-full sm:w-auto dark:bg-gray-700 dark:text-gray-300"
            onClick={closeUserInfo}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManageInfo;