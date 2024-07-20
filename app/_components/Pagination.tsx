"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Pagination = ({ disabled }: { disabled?: boolean }) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleClick = (pageNumber: number) => {
    replace(`${pathname}${pageNumber == 1 ? "" : `?page=${pageNumber}`}`);
  };

  return (
    <div className="w-full bg-white/40 rounded px-1 py-1 flex justify-end gap-1">
      {Array(5)
        .fill(null)
        .map((item, index) => {
          const pageNumber = index + (page ? page - 1 : page + 1);
          return (
            <button
              key={index}
              onClick={() => handleClick(pageNumber)}
              disabled={pageNumber > page && disabled}
              className={`rounded  text-black aspect-square p-2 w-9 text-center disabled:opacity-60 disabled:cursor-not-allowed ${
                !page
                  ? "first:bg-cyan-800 first:text-white first:font-bold bg-white"
                  : page == pageNumber
                  ? " bg-cyan-800 text-white font-bold"
                  : "bg-white"
              } `}
            >
              {pageNumber}
            </button>
          );
        })}
    </div>
  );
};

export default Pagination;
