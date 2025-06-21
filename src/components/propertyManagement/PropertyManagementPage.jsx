import React from 'react'
import PropertyManagementTable from './PropertyManagementTable'
import PropertyDetail from './PropertyDetail'
import { useSelector } from 'react-redux'

const PropertyManagement = () => {
    const showPropertyInfo = useSelector(store=>store.PropertyInfo.showPropertyInfo);
  
  return (
    <div className='Side_class mt-15 '>
      <div className='my-5 mx-10'>
        <h1 className='text-3xl font-bold'>Property Management</h1>
      </div>
      <div className='flex mx-10 my-10'>
        <input className="bg-white h-12 w-[390px] px-3 rounded-xl "type='text' placeholder='Search Property'></input>
        <select className='h-12 mx-4 w-[310px] bg-white rounded-xl px-10 pe-5 shadow-2xl'>
          <option value="all">All Status</option>
          <option value="all">Active</option>
          <option value="all">Inactive</option>
          <option value="all">For Sale</option>
          <option value="all">For Rent</option>
        </select>
        <select className='h-12 mx-4 w-[310px] bg-white rounded-xl px-10 pe-5 shadow-2xl'>
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
