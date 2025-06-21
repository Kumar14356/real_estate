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
    <div className="mt-10 px-4 lg:px-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        <h4 className="mt-2 text-sm md:text-base tracking-normal text-gray-600">
          Manage and Track your employees effectively.
        </h4>
      </div>

      <div className="my-6">
        <form className="flex flex-col md:flex-row gap-4 md:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <input
              onChange={handleManageInfo}
              ref={searchText}
              className="w-full h-12 pl-12 pr-4 bg-white rounded-xl shadow-lg"
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
            className="h-12 w-full md:w-[200px] bg-white rounded-xl px-4 shadow-lg"
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