import {
  getAccessTokenGoogle,
  requestLoginSocail,
} from "@/services/socialService";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GoogleCallBack = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const fetchData = async () => {
    if (code && state === "google") {
      try {
        const response = await getAccessTokenGoogle(code);
        const accessToken = response.data.access_token;
        if (accessToken) {
          const data = await requestLoginSocail(accessToken, state);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [code]);

  return <div>Loading...</div>;
};

export default GoogleCallBack;
