import { createSlice } from "@reduxjs/toolkit";
import { login, getUserProfile, userUpdateProfile } from "./authThunks";

// Retrieve stored information from localStorage
const storedToken = localStorage.getItem('accessToken');
const storedUserName = localStorage.getItem('userName');
const storedFirstName = localStorage.getItem('firstName');
const storedLastName = localStorage.getItem('lastName');
const storedEmail = localStorage.getItem('email');

const initialState = {
  currentUser: storedToken || null,
  userName: storedUserName || '',
  firstName: storedFirstName || '',
  lastName: storedLastName || '',
  email: storedEmail || '',
  isUserEdit: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.currentUser = null;
      state.userName = '';
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
    profilEdit: (state) => {
      state.isUserEdit = !state.isUserEdit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.body.token;
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
        const { userName, firstName, lastName, email } = action.payload.body;
        state.userName = userName;
        state.firstName = firstName;
        state.lastName = lastName;
        state.email = email;
        state.isLoading = false;
        localStorage.setItem('userName', userName);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userUpdateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userUpdateProfile.fulfilled, (state, action) => {
        const { firstName, lastName, userName } = action.payload.body;
        state.userName = userName;
        state.firstName = firstName;
        state.lastName = lastName;
        state.isLoading = false;
        state.isUserEdit = false;
        localStorage.setItem('userName', userName);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
      })
      .addCase(userUpdateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, profilEdit } = authSlice.actions;
export default authSlice.reducer;