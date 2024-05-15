import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../api/baseurl';

// Define the initial state
const initialState = {
  users: [],
  name:'',
  email:'',
  status: 'active',
  age:'0',
  isFormVisible: false,
  roles: [],
  userCreationStatus: null,
  error: null,

};

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
// Define a thunk to fetch roles from the API
export const fetchRoles = createAsyncThunk('user/fetchRoles', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/role/`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});


// Define a thunk to update a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, userData }) => {
  try {
    const response = await axios.put(`${baseUrl}/api/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define a thunk to delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  try {
    await axios.delete(`${baseUrl}/api/user/${userId}`);
    return userId;
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
    }  
  },
  extraReducers: (builder) => {
    builder
    //fetchRoles
    .addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    })



    //fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
     
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
    
        state.users = action.payload.sort((a, b) => {
          // Assuming the users have a createdAt field indicating creation time
          return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
        });
      })
     
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })



      //updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.userId === action.payload.userId);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })



      //deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.userId !== action.payload);
      })



      //createUser

      .addCase(createUser.pending, (state) => {
        state.userCreationStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userCreationStatus = 'success';
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.userCreationStatus = 'error';
        state.error = action.error.message;
      });

  },
});


export default userSlice.reducer;
export const { setUserList } = userSlice.actions;
