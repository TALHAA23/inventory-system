"use client";

import { usePathname, useRouter } from "next/navigation";

const ShowProductIventoryDetailsButtons = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleClick = () => {
    replace(`${pathname}?d=${id}`);
  };
  return (
    <button
      onClick={handleClick}
      className=" text-white font-bold bg-green-800 w-fit ml-auto px-5 py-2 rounded-full mx-1 hover:opacity-80"
    >
      More
    </button>
  );
};

export default ShowProductIventoryDetailsButtons;
