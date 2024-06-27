import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../api/baseurl";

const initialState = {
  settings: [],
  loading: false,
  error: null,
  isCreatingSetting: false,
  settingCreationStatus: null,
};

// Define a thunk to fetch settings from the API
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/settings/`);

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
// Define a fetchSettingsData Async Thunk
export const fetchSettingById = createAsyncThunk(
  "users/fetchSettingData",
  async (settingId) => {
    const response = await axios.get(`${baseUrl}/api/settings/${settingId}`);
    return response.data;
  }
);
// Define a thunk to create a new role
export const createSetting = createAsyncThunk(
  "settings/createSetting",
  async (settingData) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/settings/`,
        settingData
      );
      return response.data.data; // Assuming the response contains the created role in `data.data`
    } catch (error) {
      throw error;
    }
  }
);
// Define a thunk to update a user
export const updateSetting = createAsyncThunk(
  "settings/updateSetting",
  async ({ settingId, settingData }, { dispatch }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/settings/${settingId}`,
        settingData
      );
      console.log(settingId, settingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
// Define a thunk to delete a setting
export const deleteSetting = createAsyncThunk(
  "settings/deleteSetting",
  async (settingId) => {
    try {
      await axios.delete(`${baseUrl}/api/settings/${settingId}`);
      return settingId;
    } catch (error) {
      throw error;
    }
  }
);

// Create the role slice
const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch roles
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //deleteSetting

      .addCase(deleteSetting.fulfilled, (state, action) => {
        state.settings = state.settings.filter(
          (setting) => setting.id !== action.payload
        );
      })

      // Create setting
      .addCase(createSetting.pending, (state) => {
        state.settingCreationStatus = "loading";
        state.isCreatingSetting = true;
        state.error = null;
      })
      .addCase(createSetting.fulfilled, (state, action) => {
        state.settingCreationStatus = "success";
        state.settings.push(action.payload);
        state.isCreatingSetting = false;
        state.error = null;
      })
      .addCase(createSetting.rejected, (state, action) => {
        state.settingCreationStatus = "error";
        state.error = action.error.message;
        state.isCreatingSetting = false;
      })

      //fetchSettingById
      .addCase(fetchSettingById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSettingById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchSettingById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //update role

      .addCase(updateSetting.fulfilled, (state, action) => {
        const index = state.settings.findIndex(
          (setting) => setting.settingId === action.payload.settingId
        );
        if (index !== -1) {
          state.settings[index] = action.payload;
        }
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default SettingsSlice.reducer;
