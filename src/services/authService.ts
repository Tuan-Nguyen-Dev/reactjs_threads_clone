import { RoutesName } from "@/constants/route";
import { getLocalToken } from "@/utils/auth";
import { client } from "@/utils/client";

export const requestLogin = async (dataLogin: {
  email: string;
  password: string;
}) => {
  const { data } = await client.post("/auth/login", dataLogin);
  return data;
};

export const requestRegister = async (dataRegister: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  username: string;
}) => {
  const { data } = await client.post("/auth/register", {
    ...dataRegister,
    url_target: window.location.origin + RoutesName.ACTIVE_ACCOUNT,
  });
  return data;
};

export const requestResendEmailActive = async () => {
  const token = getLocalToken();
  if (!token) {
    throw new Error("Token invalid");
  }
  const data = await client.post(
    "/auth/email/send-verification",
    {
      url_target: window.location.origin + RoutesName.ACTIVE_ACCOUNT,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const requestActiveAccount = async (token: string) => {
  const data = await client.patch("/confirm-account", {
    token,
  });
  console.log(data);
  return data;
};

export const requestLogout = async () => {
  const accessToken = getLocalToken();
  if (!accessToken) {
    throw new Error("Token is not available");
  }
  const data = await client.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};

export const requestForgotPassword = async (email: string) => {
  const data = await client.post("/forgot-password", {
    email,
    url_target: window.location.origin + RoutesName.AUTH_RESET_PASSWORD,
  });
  return data;
};

export const requestResetPassword = async ({
  password,
  password_confirmation,
  token,
}: {
  password: string;
  password_confirmation: string;
  token: string | null;
}) => {
  const data = await client.patch(`/reset-password`, {
    password,
    password_confirmation,
    token,
  });
  return data;
};
