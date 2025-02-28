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
import { MESSAGES } from "@/constants/message";
import { RoutesName } from "@/constants/route";
import { useLogout } from "@/hooks/use-logout";
import { useToast } from "@/hooks/use-toast";
import { requestResendEmailActive } from "@/services/authService";
import { useState } from "react";

const ConfirmAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useLogout();
  const { toast } = useToast();
  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      await requestResendEmailActive();
      toast({
        title: MESSAGES.AUTH.RESEND_ACTIVE_EMAIL_SUCCESSFUL,
      });
      setIsLoading(false);
    } catch (error: any) {
      toast({
        title: MESSAGES.AUTH.RESEND_ACTIVE_EMAIL_FAILED,
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
          <AlertDialogCancel onClick={() => logout(RoutesName.AUTH_LOGIN)}>
            Logout
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
