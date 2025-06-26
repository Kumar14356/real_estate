import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addtoggleInformation } from '../../utils/PropertyManagementSlice';
import { FaEye } from "react-icons/fa";

const PropertyInfo = () => {
  const propertySingleInformation = useSelector(store => store.PropertyInfo.propertySingleInformation);
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("Details")

  const handleClosePrpertyDetail = () => {
    dispatch(addtoggleInformation());

  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'>
      <div className='bg-white dark:bg-gray-500 rounded-xl p-6 w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <FaEye className='px-2 text-4xl text-green-400' /> Property Details
          </h2>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-white" onClick={handleClosePrpertyDetail}>✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("Details")}
            className={`px-4 py-2 -mb-px border-b-2 ${activeTab === "Details" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-200"}`}>
            Details
          </button>
          <button
            onClick={() => setActiveTab("Info")}
            className={`px-4 py-2 -mb-px border-b-2 ${activeTab === "Info" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-200"}`}>
            Info
          </button>
        </div>

        {/* Content */}
        {activeTab === "Details" && (
          <div className="space-y-4">
            {/* Property Name */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700 dark:text-gray-300">Property Name</p>
              </div>
              <p className="text-gray-900 dark:text-gray-100">{propertySingleInformation.projectname}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-semibold dark:text-gray-300 mb-2">Status</p>
                <span className={`px-2 py-1 rounded-full text-sm 
    ${propertySingleInformation.status
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {propertySingleInformation.status ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-semibold dark:text-gray-300 mb-2">Address</p>
                <p className="text-gray-900 dark:text-gray-100">{propertySingleInformation.city}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-semibold dark:text-gray-300 mb-2">BuiltUp Area</p>
                <span className="px-2 py-1 rounded-full text-sm">720 sq.ft</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-semibold dark:text-gray-300 mb-2">SuperBuiltUp Area</p>
                <p className="text-gray-900 dark:text-gray-100">1280 sq.ft</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-semibold dark:text-gray-300 mb-2">Name</p>
                <p className="text-gray-900 dark:text-gray-100">Nipen Modi</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-semibold dark:text-gray-300 mb-2">Pin Code</p>
                <p className="text-gray-900 dark:text-gray-100">{propertySingleInformation.zipcode}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info tab content */}
        {activeTab === "Info" && (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Configuration", value: "2" },
              { label: "Car Parking", value: "Yes" },
              { label: "Available Date", value: "0000-00-00" },
              { label: "Facing", value: "West" },
              { label: "Floor", value: "7" },
              { label: "Tenant Type", value: "N/A" },
              { label: "Price", value: "₹4200000" },
              { label: "Type", value: "Sale" },
              { label: "Contact Number", value: "6359220606" },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-semibold dark:text-gray-300 mb-2">{item.label}</p>
                <p className="text-gray-900 dark:text-gray-100">{item.value}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-end space-x-3">
          <button className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600" onClick={handleClosePrpertyDetail}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyInfo
