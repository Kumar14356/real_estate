import React from 'react'
import { useDispatch } from 'react-redux'
import { addtoggleInformation } from '../../utils/PropertyManagementSlice'

const PropertyInfo = () => {
  const dispatch =useDispatch()
  const handleClosePrpertyDetail =()=>{
dispatch(addtoggleInformation())
  }
  return (
    <div>
      <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'>
        <div className='w-[100%] max-w-3xl max-h-[100vh] bg-white overflow-y-auto rounded-2xl relative p-8'>
 <div
          className="absolute top-3 right-5 text-xl sm:text-2xl bg-gray-100 w-8 h-8 flex items-center justify-center cursor-pointer rounded-full opacity-70"
          onClick={handleClosePrpertyDetail}
        >
          ×
        </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyInfo
