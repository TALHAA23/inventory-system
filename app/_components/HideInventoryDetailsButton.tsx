"use client";

import { usePathname, useRouter } from "next/navigation";

const HideInventoryDetailsButton = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleClick = () => {
    replace(pathname);
  };
  return (
    <img
      onClick={handleClick}
      src="/icons/cross-mark-button-svgrepo-com.svg"
      alt="cross"
      className=" w-5 aspect-square cursor-pointer"
    />
  );
};

export default HideInventoryDetailsButton;
