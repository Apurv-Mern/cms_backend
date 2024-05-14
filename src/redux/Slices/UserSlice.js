import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../api/baseurl';

// Define the initial state
const initialState = {
  users: [],
  name:'',
  email:'',
  status: 'active',
  age:'',
  isFormVisible: false,
  roles: [],
  error: null,
};
// Define a thunk to fetch roles from the API
export const fetchRoles = createAsyncThunk('user/fetchRoles', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/role/`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});
// Define a thunk to create a new user
export const createUser = createAsyncThunk('users/createUser', async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/`, userData);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

// Define a thunk to fetch users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUserList: (state, action) => {
      state.users = action.payload;
    },
    toggleFormVisibility: (state) => {
      state.isFormVisible = !state.isFormVisible;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
     
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
     
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default userSlice.reducer;
export const { setUserList, toggleFormVisibility } = userSlice.actions;
