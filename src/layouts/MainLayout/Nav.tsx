import { RoutesName } from "@/constants/route";
import { cn } from "@/lib/utils";
import { CiHeart, CiUser } from "react-icons/ci";
import { FaHeart, FaUber } from "react-icons/fa";
import { GoHome, GoHomeFill, GoPlus } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { BsPin } from "react-icons/bs";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import { ReactNode, useState } from "react";
import PinContent from "./dropdown-content/PinContent";
import SettingContent from "./dropdown-content/SettingContent";
const menuItems = [
  {
    url: RoutesName.HOME,
    icon: <GoHome size={25} fill="rgb(184,184,184)" />,
    iconActive: <GoHomeFill size={25} />,
  },
  {
    url: RoutesName.SEARCH,
    icon: <IoSearch size={25} fill="rgb(184,184,184)" />,
    iconActive: <IoSearch size={25} />,
  },
  {
    url: "#",
    icon: <GoPlus size={25} className="fill-gray-400 group-hover:fill-black" />,
    active: true,
  },
  {
    url: "#",
    icon: <CiHeart size={25} fill="rgb(184,184,184)" />,
    iconActive: <FaHeart size={25} />,
  },
  {
    url: "#",
    icon: <CiUser size={25} fill="rgb(184,184,184)" />,
    iconActive: <FaUber size={25} />,
  },
];
const Nav = () => {
  const { pathname } = useLocation();

  const isActive = (url: string) => pathname === url;
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const [dropDownContent, setDropDownContent] = useState<null | ReactNode>(
    null
  );

  return (
    <div className="flex flex-col w-[80px] justify-between items-center fixed top-5 bottom-5 left-0">
      <div>
        <Link to={RoutesName.HOME}>
          <img
            src="/assets/img/logo-thread.png"
            alt="logo"
            width={30}
            height={30}
          />
        </Link>
      </div>
      {/* Menu Item */}
      <div>
        <ul className="space-y-2">
          {menuItems.map((nav, index) => (
            <li key={index} className={"mb-3 group"}>
              <Link
                to={nav.url}
                className={cn(
                  "hover:bg-[#efefef] inline-block px-3 py-2 rounded-sm",
                  nav.active && "bg-[#efefef]"
                )}
              >
                {isActive(nav.url) ? nav.iconActive : nav.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          <li className="mb-3">
            <BsPin
              size={25}
              fill="rgb(184,184,184)"
              className="cursor-pointer hover:fill-black"
              onClick={() => {
                setIsOpenDropDown(!isOpenDropDown);
                setDropDownContent(() => <PinContent />);
              }}
            />
          </li>
          <li>
            <BiMenuAltLeft
              size={25}
              fill="rgb(184,184,184)"
              className="cursor-pointer hover:fill-black"
              onClick={() => {
                setIsOpenDropDown(!isOpenDropDown);
                setDropDownContent(() => <SettingContent />);
              }}
            />
          </li>
        </ul>
        <DropDown isOpen={isOpenDropDown} onOpenChange={setIsOpenDropDown}>
          {dropDownContent}
        </DropDown>
      </div>
    </div>
  );
};

export default Nav;
