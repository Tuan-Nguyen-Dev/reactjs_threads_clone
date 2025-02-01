import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoutesName } from "@/constants/route";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "lucide-react";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";

const Register = () => {
  return (
    <div>
      <h2 className="text-center font-bold my-3 text-black">
        Log in with your Instagram account
      </h2>
      <form>
        <Input
          type="text"
          placeholder="Phone number, User name, Email"
          className="my-3 px-4 py-6 bg-[rgb(245,245,245)]"
        />
        <Input
          type="password"
          placeholder="Password"
          className="my-3 px-4 py-6 bg-[rgb(245,245,245)]"
        />

        <Button
          size={null}
          className="w-full py-4 disabled:cursor-not-allowed disabled:opacity-100 disabled:text-[gray]"
          type="submit"
          // disabled={Object.keys(errors).length > 0 || isLoading}
        >
          {/* {isLoading ? (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" />
              <span>Logging in...</span>
            </div>
          ) : (
            <small className="text-sm font-medium leading-none">Log in</small>
          )} */}
        </Button>
      </form>

      <div className="flex justify-center my-3">
        <Link to="/forgot-password" className="text-gray-500">
          Forgot password?
        </Link>
      </div>

      <div className="flex items-center justify-center py-2 gap-3">
        <Separator className="w-10" />
        <span>or</span>
        <Separator className="w-10" />
      </div>
      <div className="flex items-center justify-between gap-5 my-3">
        <Button variant="outline" className="w-full">
          <FaFacebookSquare />
          Facebook
        </Button>
        <Button variant="outline" className="w-full">
          <IoLogoGoogle />
          Google
        </Button>
      </div>
      <div className="flex justify-center my-3">
        <span>Have not an account?</span>
        <Link to={RoutesName.AUTH_REGISTER} className="text-gray-500">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Register;
