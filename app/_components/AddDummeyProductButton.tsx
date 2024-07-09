"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AddDummeyProductButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleClick = () => {
    const query = new URLSearchParams(searchParams);
    query.set("dummeyProduct", "true");
    replace(`${pathname}?${query.toString()}`);
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className=" text-xs bg-cyan-400 rounded  py-2 font-bold text-black"
    >
      Create dummey product
    </button>
  );
};

export default AddDummeyProductButton;
