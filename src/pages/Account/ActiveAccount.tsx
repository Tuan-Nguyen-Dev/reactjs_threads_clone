import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MESSAGES } from "@/constants/message";
import { RoutesName } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";
import { requestActiveAccount } from "@/services/authService";
import { AlertCircle, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const ActiveAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      handleActiveAccount(token);
    }
  }, []);
  const handleActiveAccount = async (token: string) => {
    try {
      setIsLoading(true);
      await requestActiveAccount(token);
      navigate(RoutesName.HOME);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: MESSAGES.AUTH.ACTIVE_ACCOUNT_FAILED,
      });
      console.log(error);
    }
  };

  if (!token) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    );
  }
  return isLoading ? (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertDescription>System is processing your request</AlertDescription>
    </Alert>
  ) : null;
};

export default ActiveAccount;
