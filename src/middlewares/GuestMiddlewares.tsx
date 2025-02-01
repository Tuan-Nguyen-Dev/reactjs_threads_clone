import { RoutesName } from "@/constants/route";
import { getAuthProfile } from "@/stores/middlewares/authMiddleware";
import { AppDispatch, RootState } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const GuestMiddlewares = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(getAuthProfile());
  }, []);
  if (isLoading) return null;

  if (isAuth) {
    return <Navigate to={RoutesName.HOME} />;
  }

  return <Outlet />;
};

export default GuestMiddlewares;
