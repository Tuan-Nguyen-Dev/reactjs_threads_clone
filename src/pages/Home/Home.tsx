import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuth, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { logout } = useLogout();
  if (isLoading) return <span>Loading...</span>;
  return (
    <div>
      <span>Home:{isAuth ? "Đã đăng nhập" : "Chua đăng nhập"}</span>
      <p>Hi : {user?.name}</p>
      {isAuth && <Button onClick={() => logout()}>Log out</Button>}
    </div>
  );
};

export default Home;
