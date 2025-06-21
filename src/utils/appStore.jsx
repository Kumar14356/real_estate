import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../utils/userSlice';
import managementInfoReducer from '../utils/ManagementSlice';
import PropertyInfoReducer from '../utils/PropertyManagementSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        manageUser: managementInfoReducer,
        PropertyInfo: PropertyInfoReducer,
    }
});
export default appStore;