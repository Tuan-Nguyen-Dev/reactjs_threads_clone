import { RoutesName } from "@/constants/route";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthMiddlewares = () => {
  const { isAuth, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (location.pathname === RoutesName.CONFIRM_ACCOUNT) {
    if (!isAuth && isLoading) {
      return <Navigate to={RoutesName.AUTH_LOGIN} />;
    }
    if (user?.status) {
      return <Navigate to={RoutesName.HOME} />;
    }
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthMiddlewares;
