import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      localStorage.setItem('accessToken', response.data.body.token); // Store token
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

// Thunk for updating user profile
export const userUpdateProfile = createAsyncThunk(
  "auth/userUpdateProfile",
  async ({ newFirstName, newLastName }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.currentUser; // Get token from state

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName: newFirstName, lastName: newLastName },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('API response for update:', response.data); // Log the response

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error: ", err.response ? err.response.data : err.message);
      return thunkAPI.rejectWithValue(err.response ? err.response.data.message : err.message);
    }
  }
);
