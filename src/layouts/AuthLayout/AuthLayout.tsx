import { RoutesName } from "@/constants/route";
import { Link, Outlet, useLocation } from "react-router-dom";
import authBg from "../images/2fnvJllT0yb.avif";
const AuthLayout = () => {
  const location = useLocation();

  return (
    <div
      style={
        {
          "--image-url": `url(${authBg})`,
        } as React.CSSProperties
      }
      className={`min-h-screen flex items-center justify-center bg-no-repeat bg-none lg:bg-[center_-30%] lg:bg:[length:110%] lg:bg-[image:var(--image-url)] xl:bg-contain`}
    >
      <div
        style={{
          width:
            location.pathname === RoutesName.AUTH_REGISTER ? "700px" : "418px",
        }}
        className={`mx-auto px-6 pt-[15vh]`}
      >
        <Outlet />
      </div>

      <ul className="flex flex-wrap justify-center gap-3 sm:gap-3 text-gray-500 text-xs sm:text-sm px-4 pt-5 w-full text-center absolute bottom-5 right-0 left-0">
        <li className="w-full sm:w-auto">© 2025</li>
        <li>
          <Link className="hover:underline whitespace-nowrap" to={"#"}>
            Threads Terms
          </Link>
        </li>
        <li>
          <Link className="hover:underline whitespace-nowrap" to={"#"}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link className="hover:underline whitespace-nowrap" to={"#"}>
            Cookie Policy
          </Link>
        </li>
        <li>
          <Link className="hover:underline whitespace-nowrap" to={"#"}>
            Report a problem
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AuthLayout;
