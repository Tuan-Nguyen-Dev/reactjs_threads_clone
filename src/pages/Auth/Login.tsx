/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RoutesName } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";
import { updateAuthStatus } from "@/stores/slices/authSlice";
import { saveLocalRefeshToken, saveLocalToken } from "@/utils/auth";
import { client } from "@/utils/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const { data } = await client.post("/auth/login", { email, password });
      console.log(data);
      saveLocalToken(data.access_token);
      saveLocalRefeshToken(data.refresh_token);

      dispatch(updateAuthStatus(true));

      navigate("/");
    } catch {
      setIsLoading(false);
      toast({
        title: "Username or password is incorrect",
        className:
          "fixed bottom-5 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:left-[50%] sm:translate-x-[-50%] sm:flex-col md:max-w-[420px]",
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
              message: "This field is required",
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
              message: "Password field is required",
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
        <Link to="/forgot-password" className="text-gray-500">
          Forgot password?
        </Link>
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
    </div>
  );
};

export default Login;
