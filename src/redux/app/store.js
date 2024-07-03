import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import roleReducer from "../Slices/RoleSlice";
import settingsReducer from "../Slices/SettingSlice";
import permissionReducer from "../Slices/PermissionSlice";
// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
    settings: settingsReducer,
    permissions: permissionReducer,
  },
});

export default store;
