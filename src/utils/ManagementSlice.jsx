import { createSlice } from "@reduxjs/toolkit";

const ManagementSlice = createSlice({
  name: "ManageUser",
  initialState: {
    userProfile: [],
    searchQuery: '',
    statusFilter: 'all',
    userInformation: null,
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
    },
    updateUserStatus: (state, action) => {
      const { userId, isAdmin } = action.payload;
      const user = state.userProfile.find(user => user._id === userId);
      if (user) {
        user.isAdmin = isAdmin;
      }

      // Also update userInformation if currently selected
      if (state.userInformation && state.userInformation._id === userId) {
        state.userInformation.isAdmin = isAdmin;
      }
    },
  },
});

export const {
  addUserManagement,
  showuserInformation,
  setSearchQuery,
  setStatusFilter,
  updateUserStatus, // ✅ Ensure this is exported
} = ManagementSlice.actions;

export default ManagementSlice.reducer;