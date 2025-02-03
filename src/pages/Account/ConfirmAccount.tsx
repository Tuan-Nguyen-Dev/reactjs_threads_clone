/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RoutesName } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";
import { requestResendEmailActive } from "@/services/authService";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const ConfirmAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      await requestResendEmailActive();
      toast({
        title: "Resend Email Success",
      });
      setIsLoading(false);
    } catch (error: any) {
      toast({
        title: "Resend Email Failed",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Please active account by use services
          </AlertDialogTitle>
          <AlertDialogDescription>
            We sent you a link to yout email address. Please check your email
            and click on the link to active your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => navigate(RoutesName.AUTH_REGISTER)}>
            Back to register
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleResendEmail} disabled={isLoading}>
            {isLoading ? "Resending..." : "Resend Email"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAccount;
