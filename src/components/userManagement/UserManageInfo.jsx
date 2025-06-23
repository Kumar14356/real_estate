import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsToggles } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import ToggleButton from '../ToggleButton';
import { toogleUserInfo } from '../../utils/userSlice';
import { updateUserStatus } from '../../utils/ManagementSlice';

const UserManageInfo = () => {
  const dispatch = useDispatch();
  const manageUser = useSelector((store) => store.manageUser.userInformation);
  const [isActive, setIsActive] = useState(manageUser?.isAdmin || false);
  useEffect(() => {
    setIsActive(manageUser?.isAdmin || false);
  }, [manageUser]);

  const closeUserInfo = () => dispatch(toogleUserInfo());

  const handleToggle = async (newStatus) => {
  setIsActive(newStatus);

  if (!manageUser?._id || manageUser._id.length !== 24) {
   
    return;
  }
  try {
    const response = await fetch(`https://realstate-2.onrender.com/api/v1/user/${manageUser._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isAdmin: newStatus }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user status');
    }

    const result = await response.json();
    console.log('User status updated:', result);

    dispatch(updateUserStatus({ userId: manageUser._id, isAdmin: newStatus }));
  } catch (error) {
    console.error('Error updating status:', error.message);
  }
};  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="w-full max-w-3xl max-h-[100vh] bg-white overflow-y-auto rounded-2xl relative p-8">
        <div
          className="absolute top-3 right-5 text-xl sm:text-2xl bg-gray-100 w-8 h-8 flex items-center justify-center cursor-pointer rounded-full opacity-70"
          onClick={closeUserInfo}
        >
          ×
        </div>

        <div className="mb-4">
          <h1 className="font-bold text-xl sm:text-2xl">{manageUser?.username || "N/A"}</h1>
          <p className="text-sm sm:text-base">{manageUser?.broker === "Yes" ? "Broker" : "User"}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mx-2 mt-4">
          <div className="bg-gradient-to-r from-blue-50 p-4 rounded-xl flex-1 flex justify-between items-center shadow-sm">
            <div>
              <div className="text-xl flex items-center text-blue-400">
                <BsToggles />
                <span className="text-black text-sm px-2">Status</span>
              </div>
              <h3 className={`font-bold text-xl py-2 ${isActive ? 'text-green-800' : 'text-red-600'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </h3>
            </div>
            <ToggleButton initialState={isActive} onToggle={handleToggle} />
          </div>

          <div className="bg-gradient-to-l from-purple-50 p-4 rounded-xl flex items-center flex-1 shadow-sm">
            <div>
              <div className="text-xl flex items-center text-purple-800">
                <IoIosPeople />
                <span className="text-black text-sm px-2">Role</span>
              </div>
              <h3 className="text-black font-medium text-xl py-2">
                {manageUser?.broker === "Yes" ? "Broker" : "User"}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mx-2 mt-4">
          <div className="bg-gradient-to-r from-green-50 p-4 rounded-xl flex-1 flex justify-between items-center shadow-sm">
            <div>
              <div className="text-xl flex items-center text-green-400">
                <FaPhoneAlt />
                <span className="text-black text-sm px-2">Phone</span>
              </div>
              <h3 className="text-black font-medium text-xl py-2">{manageUser?.phone_no || "N/A"}</h3>
            </div>
          </div>

          <div className="bg-gradient-to-l from-yellow-50 p-4 rounded-xl flex items-center flex-1 shadow-sm">
            <div>
              <div className="text-xl flex items-center text-red-950">
                <IoMdAdd />
                <span className="text-black text-sm px-2">Email</span>
              </div>
              <h3 className="text-black font-medium text-xl py-2">{manageUser?.email || "N/A"}</h3>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md w-full sm:w-auto"
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

