import { createSlice } from "@reduxjs/toolkit"
import { userLogin, userProfile, userUpdateProfile } from './storeActions';

const initialState = {
    isLogged: false,
    userFirstName: null,
    userLastName: null,
    userEmail: null,
    isUserEdit: false,
    authToken: (localStorage.getItem("userToken") || sessionStorage.getItem("userToken")) ?? null,
}

export const storeSlice = createSlice({
    name: "store",
    initialState: initialState,
    reducers: {
        profilEdit: (state) => {
            state.isUserEdit = !state.isUserEdit;
        },
        clearStore: (state) => {
            state.isLogged = false;
            state.userFirstName = null;
            state.userLastName = null;
            state.userEmail = null;
            state.isUserEdit = false;
            state.authToken = null;

            localStorage.clear();
            sessionStorage.clear();
        }
    },
    extraReducers(builder) {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                const isLogged = true;
                const token = action.payload.body.token;

                if (token) {
                    state.isLogged = isLogged;
                    state.authToken = token;

                    if (!localStorage.getItem("userToken")) sessionStorage.setItem("userToken", token);
                }
            })
            .addCase(userLogin.rejected, (state, action) => {
                console.log(action.error);
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                const firstName = action.payload.body.firstName;
                const lastName = action.payload.body.lastName;
                const email = action.payload.body.email;

                state.userFirstName = firstName;
                state.userLastName = lastName;
                state.userEmail = email;
            })
            .addCase(userProfile.rejected, (state, action) => {
                console.log(action.error);
            })
            .addCase(userUpdateProfile.fulfilled, (state, action) => {
                const firstName = action.payload.body.firstName;
                const lastName = action.payload.body.lastName;

                state.userFirstName = firstName;
                state.userLastName = lastName;
            })
            .addCase(userUpdateProfile.rejected, (state, action) => {
                console.log(action);
            })
    }
})

export const { profilEdit, clearStore } = storeSlice.actions;

export default storeSlice.reducer;