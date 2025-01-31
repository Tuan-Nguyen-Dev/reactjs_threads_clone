import { createSlice } from "@reduxjs/toolkit";


export const authSlices = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        updateAuthStatus: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
});


export const { updateAuthStatus } = authSlices.actions