import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

const Home = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return <div>{isAuth ? "Đã đăng nhập" : "Chua đăng nhập"}</div>;
};

export default Home;
