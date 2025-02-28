/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CONSTANTS } from "@/constants/const";
import { MESSAGES } from "@/constants/message";
import { RoutesName } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";
import { requestLogin, requestRegister } from "@/services/authService";
import { saveLocalRefeshToken, saveLocalToken } from "@/utils/auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

interface InputsType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  username: string;
}

interface SerrverError {
  [key: string]: string;
}
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<SerrverError>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit = async (formData: InputsType) => {
    try {
      setIsLoading(true);
      await requestRegister(formData);
      const { email, password } = formData;
      const data = await requestLogin({ email, password });
      saveLocalToken(data.access_token);
      saveLocalRefeshToken(data.refresh_token);

      toast({
        title: MESSAGES.AUTH.REGISTER_SUCCESSFUL,
      });
      setTimeout(() => {
        navigate(RoutesName.CONFIRM_ACCOUNT);
      }, CONSTANTS.TIMEOUT);
    } catch (error: any) {
      setIsLoading(false);
      setServerErrors(error.response.data.errors);
      toast({
        title: MESSAGES.AUTH.REGISTER_FAILED,
      });
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-center font-bold my-3 text-black">
        Register an account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-5">
              <Input
                type="text"
                placeholder="Display name"
                className="px-4 py-6 bg-[rgb(245,245,245)]"
                {...register("name", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.NAME_INVALID,
                  },
                  minLength: {
                    value: 2,
                    message: MESSAGES.AUTH.NAME_TOO_SHORT,
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              {serverErrors.name && (
                <p className="text-red-500 text-sm">{serverErrors.name[0]}</p>
              )}
            </div>

            <div className="mb-5">
              <Input
                type="email"
                placeholder="Email"
                className="px-4 py-6 bg-[rgb(245,245,245)]"
                {...register("email", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.EMAIL_INVALID,
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: MESSAGES.AUTH.EMAIL_INVALID_FORMAT,
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {serverErrors.email && (
                <p className="text-red-500 text-sm">{serverErrors.email[0]}</p>
              )}
            </div>
            <div className="mb-5">
              <Input
                type="text"
                placeholder="Phone number"
                className="px-4 py-6 bg-[rgb(245,245,245)]"
                {...register("phone", {
                  required: {
                    value: true,
                    message: MESSAGES.AUTH.PHONE_INVALID,
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: MESSAGES.AUTH.PHONE_INVALID_FORMAT,
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
              {serverErrors.phone && (
                <p className="text-red-500 text-sm">{serverErrors.phone[0]}</p>
              )}
            </div>
          </div>
          <div>
            <div className="mb-5">
              <Input
                type="text"
                placeholder="Username"
                className="px-4 py-6 bg-[rgb(245,245,245)]"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
              {serverErrors.username && (
                <p className="text-red-500 text-sm">
                  {serverErrors.username[0]}
                </p>
              )}
            </div>

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
              {serverErrors.password && (
                <p className="text-red-500 text-sm">
                  {serverErrors.password[0]}
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
              {serverErrors.password_confirmation && (
                <p className="text-red-500 text-sm">
                  {serverErrors.password_confirmation[0]}
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
            <small className="text-sm font-medium leading-none">Register</small>
          )}
          {/* Register */}
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

export default Register;
