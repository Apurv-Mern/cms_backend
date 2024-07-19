import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { baseUrl } from "../../api/baseurl";
import apiClient from "../../api/baseurl";
const initialState = {
  database: [],
  loading: false,
  error: null,
  dataType: [],
  indexType: [],
};

// Define a thunk to fetch indextype data from the API
export const fetchIndexType = createAsyncThunk(
  "database/fetchIndexType",
  async () => {
    try {
      const response = await apiClient.get(`${baseUrl}/api/indexType/`);

      return response.data.data; // Assuming your API response structure is { data: [] }
    } catch (error) {
      throw error;
    }
  }
);

// Define a thunk to fetch datatype data from the API
export const fetchDataType = createAsyncThunk(
  "database/fetchDataType",
  async () => {
    try {
      const response = await apiClient.get(`${baseUrl}/api/dataType/`);

      return response.data.data; // Assuming your API response structure is { data: [] }
    } catch (error) {
      throw error;
    }
  }
);
// Define a thunk to fetch database data from the API
export const fetchDatabase = createAsyncThunk(
  "database/fetchDatabase",
  async () => {
    try {
      const response = await apiClient.get(`${baseUrl}/api/database/`);

      return response.data.data; // Assuming your API response structure is { data: [] }
    } catch (error) {
      throw error;
    }
  }
);
// Define a thunk to create a new database
export const createDatabase = createAsyncThunk(
  "database/createDatabase",
  async (databaseData) => {
    try {
      const response = await apiClient.post(
        `${baseUrl}/api/database/`,
        databaseData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
// Define a thunk to delete a user
export const deleteDatabase = createAsyncThunk(
  "database/deleteDatabase",
  async (tableName) => {
    try {
      await apiClient.delete(`${baseUrl}/api/database/${tableName}`);
      return tableName;
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
      // Fetch indexType data
      .addCase(fetchIndexType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndexType.fulfilled, (state, action) => {
        state.indexType = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchIndexType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch datatype data
      .addCase(fetchDataType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataType.fulfilled, (state, action) => {
        state.dataType = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDataType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

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
      })
      //create database

      .addCase(createDatabase.pending, (state) => {
        state.databaseCreationStatus = "loading";
        state.isCreatingDatabase = true;
      })
      .addCase(createDatabase.fulfilled, (state, action) => {
        state.databaseCreationStatus = "success";
        state.database.push(action.payload);
        state.isCreatingDatabase = false;
      })
      .addCase(createDatabase.rejected, (state, action) => {
        state.databaseCreationStatus = "error";
        state.error = action.error.message;
        state.isCreatingDatabase = false;
      })
      //deleteDatabase
      .addCase(deleteDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.database = state.database.filter(
          (database) => database.tableName !== action.payload
        );
      })
      .addCase(deleteDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete the database";
      });
  },
});

export default DatabaseSlice.reducer;
