import React from 'react'

import ManagemntTable from './ManagemntTable';
import UserManageInfo from './UserManageInfo';
import UserInfo from './UserInfo';
import { useSelector } from 'react-redux';


const UserManagement = () => {
  const showUserInfo = useSelector(store => store.user.showUserInfo)
  return (
    <div>
      {showUserInfo && (<UserManageInfo />)}
      <UserInfo />
      <ManagemntTable />

    </div>
  )
}

export default UserManagement
