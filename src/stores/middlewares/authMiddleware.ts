import { getLocalToken } from "@/utils/auth";
import { client } from "@/utils/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAuthProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getLocalToken();
      if (!token) {
        throw new Error("Unauthorized");
      }
      const { data: response } = await client.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch {
      return rejectWithValue("Unauthorized");
    }
  }
);
