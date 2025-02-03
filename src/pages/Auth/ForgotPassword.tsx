/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MESSAGES } from "@/constants/message";
import { useToast } from "@/hooks/use-toast";
import { requestForgotPassword } from "@/services/authService";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ModelOpenForgotPassword {
  isShow: boolean;
  onOpenChange: (value: boolean) => void;
}

interface InputsType {
  email: string;
}

const ForgotPassword = (props: ModelOpenForgotPassword) => {
  const { isShow, onOpenChange } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit = async (formData: InputsType) => {
    const { email } = formData;
    try {
      setIsLoading(true);
      await requestForgotPassword(email);
      toast({
        title: MESSAGES.AUTH.FORGOT_PASSWORD,
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: error.response.data.message,
      });
    }
  };
  return (
    <Dialog open={isShow} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Please provide your email for reset password
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <div className="col-span-3">
              <Input
                id="email"
                type="email"
                placeholder="Your email ..."
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
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
              {/* {serverErrors && (
                <p className="text-red-500 text-sm mt-2">{serverErrors}</p>
              )} */}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="my-2" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ForgotPassword;
