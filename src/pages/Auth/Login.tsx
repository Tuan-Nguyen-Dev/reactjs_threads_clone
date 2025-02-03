/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MESSAGES } from "@/constants/message";
import { RoutesName } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";
import { requestLogin } from "@/services/authService";
import { saveLocalRefeshToken, saveLocalToken } from "@/utils/auth";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const TIMEOUT = 1000;
const Login = () => {
  const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    mode: "onChange",
  });

  useEffect(() => {
    trigger(["username", "password"], {
      shouldFocus: true,
    });
  }, []);

  const onSubmit = async ({
    username: email,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const data = await requestLogin({ email, password });
      saveLocalToken(data.access_token);
      saveLocalRefeshToken(data.refresh_token);
      toast({
        title: MESSAGES.AUTH.AUTH_SUCCESSFUL,
        // className:
        //   "fixed bottom-5 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:left-[50%] sm:translate-x-[-50%] sm:flex-col md:max-w-[420px]",
      });
      setTimeout(() => {
        navigate("/");
      }, TIMEOUT);
    } catch {
      setIsLoading(false);
      toast({
        title: MESSAGES.AUTH.UNAUTHENTICATED,
        // className:
        //   "fixed bottom-5 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:left-[50%] sm:translate-x-[-50%] sm:flex-col md:max-w-[420px]",
      });
    }
  };

  return (
    <div>
      <h2 className="text-center font-bold my-3 text-black">
        Log in with your Instagram account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Phone number, User name, Email"
          className="my-3 px-4 py-6 bg-[rgb(245,245,245)]"
          {...register("username", {
            required: {
              value: true,
              message: MESSAGES.AUTH.USERNAME_INVALID,
            },
          })}
        />
        <Input
          type="password"
          placeholder="Password"
          className="my-3 px-4 py-6 bg-[rgb(245,245,245)]"
          {...register("password", {
            required: {
              value: true,
              message: MESSAGES.AUTH.PASSWORD_INVALID,
            },
          })}
        />

        <Button
          size={null}
          className="w-full py-4 disabled:cursor-not-allowed disabled:opacity-100 disabled:text-[gray]"
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Logging in...</span>
            </div>
          ) : (
            <small className="text-sm font-medium leading-none">Log in</small>
          )}
          {/* <Loader2 className="animate-spin" /> */}
          {/* Log in */}
        </Button>
      </form>

      <div className="flex justify-center my-3">
        <span
          className="text-gray-500 cursor-pointer"
          onClick={() => {
            setOpenForgotPassword(true);
          }}
        >
          Forgot password?
        </span>
      </div>

      <div className="flex items-center justify-center py-2 gap-3">
        <Separator className="w-10" />
        <span>or</span>
        <Separator className="w-10" />
      </div>
      <div className="flex items-center justify-between gap-5 my-3">
        <Button variant="outline" className="w-full">
          <FaFacebookSquare />
          Facebook
        </Button>
        <Button variant="outline" className="w-full">
          <IoLogoGoogle />
          Google
        </Button>
      </div>
      <div className="flex justify-center my-3">
        <span>Have not an account?</span>
        <Link to={RoutesName.AUTH_REGISTER} className="text-gray-500">
          Register
        </Link>
      </div>
      <ForgotPassword
        isShow={openForgotPassword}
        onOpenChange={() => setOpenForgotPassword(false)}
      />
    </div>
  );
};

export default Login;
