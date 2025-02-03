import { RoutesName } from "@/constants/route";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import GuestMiddlewares from "@/middlewares/GuestMiddlewares";
import VerifyMiddleware from "@/middlewares/VerifyMiddleware";
import ActiveAccount from "@/pages/Account/ActiveAccount";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import { Route } from "react-router-dom";

export const publicRoutes = (
  <>
    <Route element={<MainLayout />}>
      <Route element={<VerifyMiddleware />}>
        <Route path={RoutesName.HOME} element={<Home />} />
        <Route path={RoutesName.SEARCH} element={<Search />} />
      </Route>
      <Route path={RoutesName.ACTIVE_ACCOUNT} element={<ActiveAccount />} />
    </Route>

    <Route element={<GuestMiddlewares />}>
      <Route element={<AuthLayout />}>
        <Route path={RoutesName.AUTH_LOGIN} element={<Login />} />
        <Route path={RoutesName.AUTH_REGISTER} element={<Register />} />
      </Route>
    </Route>
  </>
);
