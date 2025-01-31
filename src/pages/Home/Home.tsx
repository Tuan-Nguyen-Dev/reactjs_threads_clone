import { authSlices } from "@/stores/slices/authSlice";
import { RootState } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSlices.actions.updateStatus(true));
  }, []);
  console.log(isAuth);

  return <div>Home</div>;
};

export default Home;
