"use client";

import { usePDF } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const PDFButton = ({
  Doc,
  apiEndPoint,
  cacheTag,
}: {
  Doc: (data: any) => JSX.Element;
  apiEndPoint: string;
  cacheTag: string;
}) => {
  const [error, setError] = useState<null | string>(null);
  const [instace, update] = usePDF({});
  const handleClick = () => {
    setError(null);
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/${apiEndPoint}`, {
        next: { tags: [cacheTag] },
      });
      if (!res.ok) setError("Failed, Try Again!");
      else {
        const data = await res.json();
        update(<Doc data={data} />);
      }
    };
    fetchData();
  };

  useEffect(() => {
    if (instace.url) {
      const a = document.createElement("a");
      a.href = instace.url;
      a.target = "_blank";
      a.click();
    }
  }, [instace.url]);

  return (
    <button
      onClick={handleClick}
      className={`w-fit mt-2 px-3 py-2 rounded-full font-bold text-sm text-white disabled:opacity-80 disabled:cursor-not-allowed ${
        error ? "bg-red-700" : "bg-green-800"
      }`}
    >
      {error
        ? error
        : instace.loading
        ? "Loading..."
        : instace.url
        ? "Download now"
        : "Download"}
    </button>
  );
};

export default PDFButton;
