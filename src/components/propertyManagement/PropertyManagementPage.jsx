import React from 'react'
import PropertyManagementTable from './PropertyManagementTable'
import PropertyDetail from './PropertyDetail'
import { useSelector } from 'react-redux'

const PropertyManagement = () => {
    const showPropertyInfo = useSelector(store=>store.PropertyInfo.showPropertyInfo);
  
  return (
    <div className='min-h-screen py-10 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'>
      <div className='my-5 mx-10'>
        <h1 className='text-3xl font-bold'>Property Management</h1>
      </div>
      <div className='flex flex-col md:flex-row gap-4 mb-6 md:items-center my-10 mx-10'>
        <input className="w-full h-12 pl-10 pr-4 py-2 bg-white bourder rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 lg:w-[390px] "type='text' placeholder='Search Property'></input>
        <select className='h-12 w-full md:w-[310px] text-gray-600 dark:text-gray-300 px-3 py-2 rounded-md bg-white dark:bg-gray-700'>
          <option value="all">All Status</option>
          <option value="all">Active</option>
          <option value="all">Inactive</option>
          <option value="all">For Sale</option>
          <option value="all">For Rent</option>
        </select>
        <select className='h-12 w-full md:w-[310px] text-gray-600 dark:text-gray-300 px-3 py-2 rounded-md bg-white dark:bg-gray-700'>
          <option value="all">Posted by</option>
          <option value="all">Broker</option>
          <option value="all">Builder</option>
        </select>
      </div>
      <div>
        {showPropertyInfo && <PropertyDetail/>}
        <PropertyManagementTable/>

      </div>
    </div>
  )
}

export default PropertyManagement
