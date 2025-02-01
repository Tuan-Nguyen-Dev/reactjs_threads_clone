import { client } from "@/utils/client";

export const requestLogin = async (dataLogin: {
  email: string;
  password: string;
}) => {
  const { data } = await client.post("/auth/login", dataLogin);
  return data;
};
