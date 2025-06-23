import React from 'react'

import ManagemntTable from './ManagemntTable';
import UserManageInfo from './UserManageInfo';
import UserInfo from './UserInfo';
import { useSelector } from 'react-redux';


const UserManagement = () => {
  const showUserInfo = useSelector(store => store.user.showUserInfo)
  return (
    <div className='min-h-screen py-10 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'>
      {showUserInfo && (<UserManageInfo />)}
      <UserInfo />
      <ManagemntTable />

    </div>
  )
}

export default UserManagement
