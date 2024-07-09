"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HideMutationFormButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleClick = () => {
    const query = new URLSearchParams(searchParams);
    ["update", "addnew", "dummeyProduct"].map((item) => query.delete(item));
    replace(`${pathname}${query.size ? `?${query.toString()}` : ""}`);
    const fromEl = document.querySelector("#mutation-form");
    if (fromEl) (fromEl as HTMLDialogElement).close();
  };
  return (
    <img
      onClick={handleClick}
      src="/icons/cross-mark-button-svgrepo-com.svg"
      alt="cross"
      className=" absolute top-2 right-2 w-5 aspect-square cursor-pointer"
    />
  );
};

export default HideMutationFormButton;
