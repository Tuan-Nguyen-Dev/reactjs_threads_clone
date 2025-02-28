import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONSTANTS } from "@/constants/const";
import { MESSAGES } from "@/constants/message";
import { RoutesName } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";
import { requestResetPassword } from "@/services/authService";
import { Separator } from "@radix-ui/react-separator";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface InputsType {
  password: string;
  password_confirmation: string;
}

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit = async (formData: InputsType) => {
    try {
      console.log(formData);
      setIsLoading(true);
      await requestResetPassword({ ...formData, token });
      toast({
        title: MESSAGES.AUTH.RESET_PASSWORD_SUCCESSFUL,
      });
      setTimeout(() => {
        navigate(RoutesName.AUTH_LOGIN);
      }, CONSTANTS.TIMEOUT);
      setIsLoading(false);
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) {
        const data = err.response?.data as { message: string };
        return toast({
          title: data.message,
        });
      }
      toast({
        title: MESSAGES.AUTH.RESET_PASSWORD_FAILED,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate(RoutesName.AUTH_LOGIN);
    }
  }, []);
  return (
    <div>
      <h2 className="text-center font-bold my-3 text-black">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <div className="mb-5">
              <Input
                type="password"
                placeholder="Password"
                className="px-4 py-6 bg-[rgb(245,245,245)]"
                {...register("password", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.PASSWORD_INVALID,
                  },
                  minLength: {
                    value: 6,
                    message: MESSAGES.AUTH.PASSWORD_TOO_SHORT,
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <Input
                type="password"
                placeholder="Confirm Password"
                className="px-4 py-6 bg-[rgb(245,245,245)]"
                {...register("password_confirmation", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.CONFIRM_PASSWORD,
                  },
                  validate: (value) =>
                    value === watch("password") ||
                    MESSAGES.AUTH.CONFIRM_PASSWORD_INVALID,
                })}
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button
          size={null}
          className="w-full py-4 disabled:cursor-not-allowed disabled:opacity-100 disabled:text-[gray]"
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Registering...</span>
            </div>
          ) : (
            <small className="text-sm font-medium leading-none">
              Reset New Password
            </small>
          )}
        </Button>
      </form>

      <div className="flex items-center justify-center py-5 gap-3">
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
      <div className="flex justify-center py-5">
        <span>Already have an account?</span>
        <Link to={RoutesName.AUTH_LOGIN} className="text-gray-500">
          Login now
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
