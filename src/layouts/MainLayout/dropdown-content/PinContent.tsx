import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BsArrowRightShort } from "react-icons/bs";
import CustomFeeds from "./CustomFeeds";
import { useEffect, useState } from "react";

const PinContent = ({
  onOpenDropdown,
}: {
  onOpenDropdown: (value: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      onOpenDropdown(false);
    }
  }, [open]);

  return (
    <DropdownMenuContent className="w-[400px] ms-5 mb-8">
      {!open ? (
        <>
          <DropdownMenuLabel className="text-lg">Pin to home</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-sm">For You</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">Following</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">Like</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">Saved</DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm flex justify-between items-center"
            onClick={() => {
              onOpenDropdown(true);
              setOpen(true);
            }}
          >
            Custom feeds
            <BsArrowRightShort />
          </DropdownMenuItem>
        </>
      ) : (
        <CustomFeeds
          onBack={() => {
            setOpen(false);
          }}
        />
      )}
    </DropdownMenuContent>
  );
};

export default PinContent;
