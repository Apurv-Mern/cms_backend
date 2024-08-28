import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { baseUrl } from "../../api/baseurl";
import apiClient from "../../api/baseurl";
const initialState = {
  database: [],
  loading: false,
  error: null,
  dataType: [],
  indexType: [],
  tableRows: [],

  crudInfo: [],
  isLoading: false,
  crudCreationStatus: null,
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
      return response.data.data[0];
    } catch (error) {
      throw error;
    }
  }
);

// Define a thunk to create a new database
export const createTableRows = createAsyncThunk(
  "database/createTableRows",
  async (databaseData, tableName) => {
    try {
      const response = await apiClient.post(
        `${baseUrl}/api/tableRows/`,
        databaseData,
        tableName
      );
      return response.data.data[0];
    } catch (error) {
      throw error;
    }
  }
);
// Define a thunk to create a new database
export const createCRUDinfo = createAsyncThunk(
  "database/createCRUDinfo",
  async (crudData) => {
    try {
      console.log("CRUD datatytatatattata", crudData);
      const response = await apiClient.post(
        `${baseUrl}/api/crudTable/`,
        crudData
      );
      console.log("CRUD data", response.data);
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
      //create tableRows

      .addCase(createTableRows.pending, (state) => {
        state.tableRowCreationStatus = "loading";
        state.isCreatingTableRows = true;
      })
      .addCase(createTableRows.fulfilled, (state, action) => {
        state.tableRowCreationStatus = "success";
        state.tableRows.push(action.payload);
        state.isCreatingTableRows = false;
      })
      .addCase(createTableRows.rejected, (state, action) => {
        state.tableRowCreationStatus = "error";
        state.error = action.error.message;
        state.isCreatingTableRows = false;
      })

      //create createCRUDinfo
      .addCase(createCRUDinfo.pending, (state) => {
        state.crudCreationStatus = "loading";
        state.isLoading = true;
      })
      .addCase(createCRUDinfo.fulfilled, (state, action) => {
        state.crudCreationStatus = "success";
        state.crudInfo.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCRUDinfo.rejected, (state, action) => {
        state.crudCreationStatus = "error";
        state.error = action.error.message;
        state.isLoading = false;
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
