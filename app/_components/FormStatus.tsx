"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

const FormStatus = ({
  loadingText,
  onsuccessText,
  queryKeyToDelete = [],
  error,
  tailwindClasses = "",
}: {
  loadingText?: string;
  onsuccessText?: string;
  queryKeyToDelete?: string[];
  error?: any;
  tailwindClasses?: string;
}) => {
  const isSubmitting = useRef(false);
  const formState = useFormStatus();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  useEffect(() => {
    console.log(error);
    if (formState.pending) isSubmitting.current = true;
    if (isSubmitting.current && !formState.pending && !error) {
      const query = new URLSearchParams(searchParams);
      queryKeyToDelete.map((key) => query.delete(key));
      replace(`${pathname}${query.size ? `?${query.toString()}` : ""}`);
    }
  }, [
    formState.pending,
    error,
    pathname,
    queryKeyToDelete,
    replace,
    searchParams,
  ]);
  return (
    <p className={`w-full text-xs my-2 text-white ${tailwindClasses}`}>
      {formState.pending ? loadingText || "Submitting..." : onsuccessText || ""}
    </p>
  );
};

export default FormStatus;
