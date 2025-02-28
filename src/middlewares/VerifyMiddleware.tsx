import { RoutesName } from "@/constants/route";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const VerifyMiddleware = () => {
  const { isLoading, user, isAuth } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  if (isLoading) {
    return <span>Loading....</span>;
  }
  if (
    isAuth &&
    !user?.status &&
    location.pathname !== RoutesName.CONFIRM_ACCOUNT
  ) {
    return <Navigate to={RoutesName.CONFIRM_ACCOUNT} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default VerifyMiddleware;
