import { client } from "@/utils/client";
import axios from "axios";

export const getGoogleRedirectUrl = () => {
  const params = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "email profile",
    state: "google",
  };
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
    params
  )}`;
  return url;
};

export const getAccessTokenGoogle = async (code: string) => {
  const data = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });
  return data;
};

export const requestLoginSocail = async (
  accessToken: string,
  provider: string
) => {
  const { data } = await client.post(`/auth/social/${provider}`, {
    access_token: accessToken,
  });
  return data;
};

export const getGithubRedirectUrl = () => {
  const params = {
    client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
    scope: "user",
    state: "github",
  };
  const url = `https://github.com/login/oauth/authorize?${new URLSearchParams(
    params
  )}`;

  return url;
};

export const getAccessTokenGithub = async (code: string) => {
  const data = await client.post("/auth/github/token", {
    code,
    client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
    client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
    redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
    grant_type: "authorization_code",
  });
  return data;
};
