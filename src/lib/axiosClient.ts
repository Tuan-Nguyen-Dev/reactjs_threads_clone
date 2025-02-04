import { requestLogout, requestRefreshToken } from "@/services/authService";
import {
  getLocalToken,
  removeLocalToken,
  saveLocalRefeshToken,
  saveLocalToken,
} from "@/utils/auth";
import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BARE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (getLocalToken) {
      const accessToken = getLocalToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let refreshTokenPromise: Promise<{
  data: { access_token: string; refresh_token: string };
}> | null = null;
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.status === 401 &&
      error.response.config.url !== "/auth/refresh" &&
      error.response.config.url !== "/auth/logout" &&
      getLocalToken()
    ) {
      try {
        if (!refreshTokenPromise) {
          refreshTokenPromise = requestRefreshToken();
        }
        const { data: newToken } = await refreshTokenPromise;
        if (newToken) {
          saveLocalToken(newToken.access_token);
          saveLocalRefeshToken(newToken.refresh_token);
          return instance.request(error.response.config);
        }
      } catch {
        await requestLogout();
        removeLocalToken();
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
