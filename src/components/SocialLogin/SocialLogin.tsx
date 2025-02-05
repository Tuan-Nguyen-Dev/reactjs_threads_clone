import { MESSAGES } from "@/constants/message";
import { useToast } from "@/hooks/use-toast";
import {
  getAccessTokenGoogle,
  requestLoginSocail,
} from "@/services/socialService";
import { saveLocalRefeshToken, saveLocalToken } from "@/utils/auth";
import { ReactNode, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SocialLogin = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const fetchData = async () => {
    if (code && state === "google") {
      try {
        const response = await getAccessTokenGoogle(code);
        const accessToken = response.data.access_token;
        if (accessToken) {
          const data = await requestLoginSocail(accessToken, state);
          saveLocalToken(data.access_token);
          saveLocalRefeshToken(data.refresh_token);
          toast({
            title: MESSAGES.AUTH.AUTH_SUCCESSFUL,
            // className:
            //   "fixed bottom-5 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:left-[50%] sm:translate-x-[-50%] sm:flex-col md:max-w-[420px]",
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [code]);
  return children;
};

export default SocialLogin;
