"use client";
import updateButtonStyles from "@/app/_styles/updateButton.module.css";
import addNewButtonStyles from "@/app/_styles/addNewButton.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type QueryFor = "update" | "addnew";
const ShowMutationFormButton = ({
  id,
  buttonFor,
}: {
  buttonFor: QueryFor;
  id?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isUpdateBtn = buttonFor == "update";
  if (isUpdateBtn && !id) throw new Error("ID required to update a product");
  const handleClick = () => {
    const query = new URLSearchParams(searchParams);
    query.set(buttonFor, isUpdateBtn ? (id as string) : "true");
    replace(`${pathname}?${query.toString()}`);
    const formEl = document.querySelector("#mutation-form");
    if (formEl) (formEl as HTMLDialogElement).showModal();
  };

  return (
    <button
      onClick={handleClick}
      className={(isUpdateBtn ? updateButtonStyles : addNewButtonStyles).button}
    >
      {isUpdateBtn ? "Update" : "Add New"}
    </button>
  );
};

export default ShowMutationFormButton;
