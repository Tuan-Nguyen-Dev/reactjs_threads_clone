import { createSlice } from "@reduxjs/toolkit";


export const authSlices = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        updateStatus: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
});