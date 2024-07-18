import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import roleReducer from "../Slices/RoleSlice";
import settingsReducer from "../Slices/SettingSlice";
import permissionReducer from "../Slices/PermissionSlice";
import databaseReducer from "../Slices/DatabaseSlice";
// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
    settings: settingsReducer,
    permissions: permissionReducer,
    database: databaseReducer,
  },
});

export default store;
