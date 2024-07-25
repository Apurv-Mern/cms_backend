import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/baseurl";

const initialState = {
  permissions: [],
  loading: false,
  error: null,
  permissionNames: [],
  //   isCreatingRole: false,
  //   roleCreationStatus: null,
};

// Define a thunk to fetch roles from the API
export const fetchPermissions = createAsyncThunk(
  "role/fetchPermissions",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/permissions/`);

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create the permissions slice
const PermissionSlice = createSlice({
  name: "permissions",
  initialState,

  reducers: {
    setPermissionNames: (state, action) => {
      const rolePermissions = action.payload;

      state.permissionNames = rolePermissions
        .map((rolePermission) => {
          const permission = state.permissions.find(
            (p) => p.permissionId === rolePermission.permissionId
          );
          return permission ? permission.permissionName : null;
        })
        .filter((name) => name !== null);
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch permissions
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPermissionNames } = PermissionSlice.actions;

export default PermissionSlice.reducer;
