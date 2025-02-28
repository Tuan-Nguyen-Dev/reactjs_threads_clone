import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

interface DropDownMenuItem {
  isOpen: boolean;
  onOpenChange: (status: boolean) => void;
  children: ReactNode;
}

const DropDown = (props: DropDownMenuItem) => {
  const { isOpen, onOpenChange, children } = props;

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default DropDown;
