import { requestLogout } from "@/services/authService";
import { removeLocalToken } from "@/utils/auth";

export const useLogout = () => {
  const logout = async (redirectTo: string = "/") => {
    try {
      await requestLogout();
      removeLocalToken();
      window.location.href = redirectTo;
    } catch (error) {
      console.log(error);
    }
  };
  return { logout };
};
