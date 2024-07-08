"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ShowProductIventoryDetailsButtons = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleClick = () => {
    const query = new URLSearchParams(searchParams);
    query.set("d", id);
    replace(`${pathname}?${query.toString()}`);
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
