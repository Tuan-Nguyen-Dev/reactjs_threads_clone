import { createSlice } from "@reduxjs/toolkit";
import { getAuthProfile } from "../middlewares/authMiddleware";

interface AuthState {
  isAuth: boolean;
  user: null | {
    name: string;
  };
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isLoading: false,
};

export const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // updateAuthStatus: (state, action) => {
    //     state.isAuth = action.payload
    // },
    // updateAuthUser: (state, action) => {
    //     state.user = action.payload
    // },
    // updateAuthLoading: (state, action) => {
    //     state.isLoading = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAuthProfile.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAuthProfile.rejected, (state) => {
      state.isAuth = false;
      state.isLoading = false;
    });
  },
});

// export const { updateAuthStatus } = authSlices.actions
