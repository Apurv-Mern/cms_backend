import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/baseurl";

const initialState = {
  database: [],
  loading: false,
  error: null,
};

// Define a thunk to fetch database data from the API
export const fetchDatabase = createAsyncThunk(
  "database/fetchDatabase",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/database/`);
      console.log("hjhhsjhbjhjjkasjasdkjasdkjsahdjksdkj", response.data.data);
      return response.data.data; // Assuming your API response structure is { data: [] }
    } catch (error) {
      throw error;
    }
  }
);

// Create the database slice
const DatabaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch database data
      .addCase(fetchDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatabase.fulfilled, (state, action) => {
        state.database = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default DatabaseSlice.reducer;
