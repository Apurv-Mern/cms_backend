import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import roleReducer from "../Slices/RoleSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
  },
});

export default store;
