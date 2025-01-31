import { RoutesName } from "@/constants/route";
import { getLocalToken } from "@/utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const GuestMiddlewares = () => {
  const isAuth = getLocalToken() ? true : false;

  if (isAuth) {
    return <Navigate to={RoutesName.HOME} />;
  }
  return <Outlet />;
};

export default GuestMiddlewares;
