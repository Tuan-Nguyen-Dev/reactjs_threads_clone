import { RoutesName } from "@/constants/route";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import AuthMiddlewares from "@/middlewares/AuthMiddlewares";
import Account from "@/pages/Account/Account";
import ConfirmAccount from "@/pages/Account/ConfirmAccount";
import { Route } from "react-router-dom";

export const privateRoutes = (
  <>
    <Route element={<MainLayout />}>
      <Route element={<AuthMiddlewares />}>
        <Route path={RoutesName.ACCOUNT} element={<Account />} />
        <Route path={RoutesName.CONFIRM_ACCOUNT} element={<ConfirmAccount />} />
      </Route>
    </Route>
  </>
);
