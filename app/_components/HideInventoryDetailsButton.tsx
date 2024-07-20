"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
const HideInventoryDetailsButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleClick = () => {
    const query = new URLSearchParams(searchParams);
    query.delete("d");
    replace(`${pathname}${query.size ? `?${query.toString()}` : ""}`);
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
