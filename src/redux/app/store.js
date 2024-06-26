import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import roleReducer from "../Slices/RoleSlice";
import settingsReducer from "../Slices/SettingSlice";
// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
    settings: settingsReducer,
  },
});

export default store;
