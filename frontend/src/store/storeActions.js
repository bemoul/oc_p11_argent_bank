import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk('store/userLogin', async ({email, password, rememberMe}) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/v1/user/login`, {
            email,
            password
        });

        if (response.status === 200) {
            if (rememberMe) localStorage.setItem("userToken", response.data.body.token);

            return response.data;
        }
    } catch (error) {
        throw error;
    }
})

export const userProfile = createAsyncThunk('store/userProfile', async (token) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/v1/user/profile`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
})

export const userUpdateProfile = createAsyncThunk('store/userUpdateProfile', async ({newFirstName, newLastName, token}) => {
    try {
        const response = await axios.put(`http://localhost:3001/api/v1/user/profile`, {
            firstName: newFirstName,
            lastName: newLastName
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
})

export const profilEdit = createAction("store/profilEdit");

export const clearStore = createAction("store/clearStore");