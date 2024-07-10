"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

const FormStatus = ({
  loadingText,
  onsuccessText,
  queryKeyToDelete = [],
  tailwindClasses = "",
}: {
  loadingText?: string;
  onsuccessText?: string;
  queryKeyToDelete?: string[];
  tailwindClasses?: string;
}) => {
  const isSubmitting = useRef(false);
  const formState = useFormStatus();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  useEffect(() => {
    if (formState.pending) isSubmitting.current = true;
    if (isSubmitting.current && !formState.pending) {
      const query = new URLSearchParams(searchParams);
      queryKeyToDelete.map((key) => query.delete(key));
      replace(`${pathname}${query.size ? `?${query.toString()}` : ""}`);
    }
  }, [formState.pending]);
  return (
    <p className={`w-full text-xs my-2 text-white ${tailwindClasses}`}>
      {formState.pending ? loadingText || "Submitting..." : onsuccessText || ""}
    </p>
  );
};

export default FormStatus;
