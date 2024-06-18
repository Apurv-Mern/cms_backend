import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/baseurl";

const initialState = {
  roles: [],
  loading: false,
  error: null,
  isCreatingRole: false,
  roleCreationStatus: null,
};

// Define a thunk to fetch roles from the API
export const fetchRoles = createAsyncThunk("role/fetchRoles", async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/role/`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

// Define a thunk to create a new role
export const createRole = createAsyncThunk(
  "role/createRole",
  async (roleData) => {
    try {
      const response = await axios.post(`${baseUrl}/api/role/`, roleData);
      return response.data.data; // Assuming the response contains the created role in `data.data`
    } catch (error) {
      throw error;
    }
  }
);
// Define a thunk to update a user
export const updateRole = createAsyncThunk(
  "roles/updateUser",
  async ({ roleId, roleData }, { dispatch }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/role/${roleId}`,
        roleData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
// Define a thunk to delete a user
export const deleteRole = createAsyncThunk(
  "roles/deleteUser",
  async (roleId) => {
    try {
      await axios.delete(`${baseUrl}/api/role/${roleId}`);
      return roleId;
    } catch (error) {
      throw error;
    }
  }
);

// Create the role slice
const RoleSlice = createSlice({
  name: "role",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create role
      .addCase(createRole.pending, (state) => {
        state.roleCreationStatus = "loading";
        state.isCreatingRole = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roleCreationStatus = "success";
        state.roles.push(action.payload);
        state.isCreatingRole = false;
        state.error = null;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.roleCreationStatus = "error";
        state.error = action.error.message;
        state.isCreatingRole = false;
      })

      //delete roles

      //deleteUser
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(
          (role) => role.roleId !== action.payload
        );
      })

      //update role

      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(
          (role) => role.roleId === action.payload.roleId
        );
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default RoleSlice.reducer;
