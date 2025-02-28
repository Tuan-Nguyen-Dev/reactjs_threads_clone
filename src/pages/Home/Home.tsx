import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";
import { RootState } from "@/stores/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuth, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { logout } = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };
  if (isLoading) return <span>Loading...</span>;
  return (
    <div>
      <span>Home:{isAuth ? "Đã đăng nhập" : "Chưa đăng nhập"}</span>
      <p>Hi : {user?.name}</p>
      {isAuth && (
        <Button onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Log out"}
        </Button>
      )}
    </div>
  );
};

export default Home;
