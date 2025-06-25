import React, { useState } from 'react';
import PropertyManagementTable from './PropertyManagementTable';
import PropertyDetail from './PropertyDetail';
import { useSelector } from 'react-redux';

const PropertyManagement = () => {
  const showPropertyInfo = useSelector(store => store.PropertyInfo.showPropertyInfo);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [postedByFilter, setPostedByFilter] = useState('all');

  return (
    <div className='min-h-screen pt-18 px-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold'>Property Management</h1>
      </div>

      {/* Filters */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <input
          type='text'
          placeholder='Search Property'
          className="w-full h-12 pl-4 pr-4 py-2 bg-white rounded-lg shadow-sm dark:bg-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='h-12 w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>

        <select
          value={postedByFilter}
          onChange={(e) => setPostedByFilter(e.target.value)}
          className='h-12 w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
        >
          <option value="all">Posted by</option>
          <option value="Broker">Broker</option>
          <option value="Builder">Builder</option>
        </select>
      </div>

      {/* Table and Detail View */}
      <div>
        {showPropertyInfo && <PropertyDetail />}
        <PropertyManagementTable
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          postedByFilter={postedByFilter}
        />
      </div>
    </div>
  );
};

export default PropertyManagement;
