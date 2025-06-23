import React, { useRef } from 'react';
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setSearchQuery, setStatusFilter } from '../../utils/ManagementSlice';

const UserInfo = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const handleManageInfo = () => {
    dispatch(setSearchQuery(searchText.current.value));
  };

  const handleStatusChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  return (
    <div className="lg:px-10 mt-5">
      <div>
        <h1 className="text-3xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">User Management</h1>
        <h4 className="mt-2 text-sm md:text-base tracking-normal text-gray-600 dark:text-gray-300">
          Manage and Track your employees effectively.
        </h4>
      </div>

      <div className="my-6">
        <form className="flex flex-col md:flex-row gap-4 mb-6 md:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <input
              onChange={handleManageInfo}
              ref={searchText}
              className="w-full h-12 pl-10 pr-4 py-2 bg-white bourder rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
              type="text"
              placeholder="Search employees..."
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500">
              <CiSearch />
            </span>
          </div>

          {/* Status filter */}
          <select
            onChange={handleStatusChange}
            className="h-12 w-full md:w-[200px] text-gray-600 dark:text-gray-300 px-3 py-2 rounded-md bg-white dark:bg-gray-700"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;