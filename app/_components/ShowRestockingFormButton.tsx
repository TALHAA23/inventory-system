"use client";
import { usePathname, useRouter } from "next/navigation";

const ShowRestockingFormButton = ({ productId }: { productId: string }) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = () => {
    replace(`${pathname}?restock=${productId}`);
  };

  return (
    <button
      onClick={handleClick}
      className=" py-1 px-3 rounded-full bg-green-800 text-white text-xs"
    >
      Re-Stock
    </button>
  );
};

export default ShowRestockingFormButton;
