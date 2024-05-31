import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve stored information from localStorage
const storedToken = localStorage.getItem('accessToken');
const storedFirstName = localStorage.getItem('firstName');
const storedLastName = localStorage.getItem('lastName');
const storedEmail = localStorage.getItem('email');

// Initial state
const initialState = {
  currentUser: storedToken || null,
  firstName: storedFirstName || '',
  lastName: storedLastName || '',
  email: storedEmail || '',
  isUserEdit: false,
  isLoading: false,
  error: null,
};

// Thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        userData
      );
      console.log('API response: ', response.data);
      localStorage.setItem('accessToken', response.data.token); // Store token
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to login');
    }
  }
);

// Thunk for fetching user profile
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (token, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/profile", {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('API response: ', response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Failed to fetch user profile');
    }
  }
);

// Slice for authentication management
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to log out the user
    logout: (state) => {
      state.accessToken = null;
      state.currentUser = null;
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.isUserEdit = false;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('email');
      localStorage.removeItem('accessToken');
    },
    // Action to toggle profile edit state
    profilEdit: (state) => {
      state.isUserEdit = !state.isUserEdit;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        const { firstName, lastName, email } = action.payload.body;
        state.firstName = firstName;
        state.lastName = lastName;
        state.email = email;
        state.isLoading = false;

        // Save user data in local storage
        localStorage.setItem('currentUser', JSON.stringify(action.payload.body));
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, profilEdit } = authSlice.actions;
export default authSlice.reducer;
