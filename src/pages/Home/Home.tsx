import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuth, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  if (isLoading) return <span>Loading...</span>;
  // console.log(isAuth, isLoading, user);
  return (
    <div>
      <span>Home:{isAuth ? "Đã đăng nhập" : "Chua đăng nhập"}</span>
      <p>Hi : {user?.name}</p>
    </div>
  );
};

export default Home;
