import { createSlice } from "@reduxjs/toolkit";

const ManagementSlice = createSlice({
  name: "ManageUser",
  initialState: {
    userProfile: null,
    searchQuery: '',
    statusFilter: 'all', 
    userInformation: null
  },
  reducers: {
    addUserManagement: (state, action) => {
      state.userProfile = action.payload;
    },
    showuserInformation: (state, action) => {
      state.userInformation = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action) => { 
      state.statusFilter = action.payload;
    }
  },
});

export const {
  addUserManagement,
  showuserInformation,
  setSearchQuery,
  setStatusFilter, // ✅ Export new reducer
} = ManagementSlice.actions;

export default ManagementSlice.reducer;