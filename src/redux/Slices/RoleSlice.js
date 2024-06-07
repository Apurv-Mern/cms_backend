import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/baseurl";

const initialState = {
  roles: [],
  loading: false,
  error: null,
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

//Create the user slice
const RoleSlice = createSlice({
  name: "role",
  initialState,

  extraReducers: (builder) => {
    builder
      //fetchRoles
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
      });
  },
});

export default RoleSlice.reducer;
