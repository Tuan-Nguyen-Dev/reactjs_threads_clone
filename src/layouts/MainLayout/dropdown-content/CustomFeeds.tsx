import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft, ChartAreaIcon } from "lucide-react";

const CustomFeeds = ({ onBack }: { onBack: () => void }) => {
  return (
    <>
      <DropdownMenuLabel className="text-md flex items-center justify-between">
        <ArrowLeft onClick={onBack} />
        Custom Feed
        <ChartAreaIcon />
      </DropdownMenuLabel>
      <div className="">
        <p>Empty</p>
      </div>
    </>
  );
};

export default CustomFeeds;
