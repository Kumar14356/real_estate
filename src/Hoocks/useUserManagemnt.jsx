import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUserManagement } from '../utils/ManagementSlice';

const useUserManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await fetch('https://realstate-2.onrender.com/api/v1/user/', {
        method: 'GET',
      });

      const json = await response.json();

      

      dispatch(addUserManagement(json.data));
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };
};

export default useUserManagement;