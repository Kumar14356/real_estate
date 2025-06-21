import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUserManagement } from '../utils/ManagementSlice';

const useUserManagemnt = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users?limit=200');
      const json = await response.json();

      const types = ['Admin', 'User', 'Agent', 'Broker']; // You can customize this

      const users = json.users.map(user => ({
        _id: user.id,
        full_name: `${user.firstName} ${user.lastName}`,
        email_id: user.email,
        phone_no: user.phone,
        status: Math.random() > 0.5 ? "Active" : "Inactive",
        broker: Math.random() > 0.8 ? "Yes" : "No",
        type: types[Math.floor(Math.random() * types.length)],
      }));

      dispatch(addUserManagement(users));
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };
};

export default useUserManagemnt;