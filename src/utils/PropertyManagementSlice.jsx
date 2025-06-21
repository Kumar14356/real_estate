import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk for deleting a project
export const deleteProject = createAsyncThunk(
  "ManageUser/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://realstate-2.onrender.com/api/v1/project/${projectId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      return projectId; // Return the deleted project ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const PropertyManagementSlice = createSlice({
  name: "ManageUser",
  initialState: {
    projectList: [], // Add this to manage list of projects
    propertyInformation: null,
    showPropertyInfo: false,
    loading: false,
    error: null,
  },
  reducers: {
    addPropertyInformation: (state, action) => {
      state.propertyInformation = action.payload;
    },
    addtoggleInformation: (state) => {
      state.showPropertyInfo = !state.showPropertyInfo;
    },
    setProjectList: (state, action) => {
      state.projectList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectList = state.projectList.filter(
          (project) => project._id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addPropertyInformation,
  addtoggleInformation,
  setProjectList,
} = PropertyManagementSlice.actions;

export default PropertyManagementSlice.reducer;