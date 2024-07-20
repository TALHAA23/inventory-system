"use client";

import { useEffect, useState } from "react";
import AllProductsPdf from "./Pdf/AllProductsPdf";
import MonthlyRecordPdf from "./Pdf/MonthlyRecordPdf";
import PDFButton from "./PDFButton";

const downloadables = [
  {
    title: "download all prodcuts",
    details:
      "download all the products information as PDF including product name, stock, price etc",
    PDFDoc: AllProductsPdf,
    apiEndPoint: "all-products",
    cacheTag: "all-products-endpoint",
  },
  {
    title: "download monthly stats",
    details:
      "download stats like you income, revenue you make, sales, about each month so far.",
    PDFDoc: MonthlyRecordPdf,
    apiEndPoint: "all-months",
    cacheTag: "monthly-recored-for-pdf",
  },
];

const Exports = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    document.title = "export";
  }, []);
  return (
    <div className="text-white bg-color-8 min-h-[calc(100vh-70px)] m-1 p-2">
      {isClient && (
        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {downloadables.map(
            ({ title, details, PDFDoc, apiEndPoint, cacheTag }, index) => (
              <div
                key={index}
                className="p-3 min-h-[200px] text-slate-900/80 bg-color-5 rounded flex flex-col gap-2"
              >
                <h1 className=" font-bold text-lg sm:text-xl capitalize">
                  {title}
                </h1>
                <small className=" text-xs text-white/80 px-2">{details}</small>
                <PDFButton
                  Doc={PDFDoc}
                  apiEndPoint={apiEndPoint}
                  cacheTag={cacheTag}
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Exports;
