"use client";
import React from "react";
import PDFButton from "../_components/PDFButton";
import AllProductsPdf from "../_components/Pdf/AllProductsPdf";

const downloadables = [
  {
    title: "download all prodcuts",
    details:
      "download all the products information as PDF including product name, stock, price etc",
    PDFDoc: AllProductsPdf,
    apiEndPoint: "all-products",
    cacheTag: "all-products-endpoint",
  },
];

const page = () => {
  return (
    <div className="text-white bg-color-8 min-h-[calc(100vh-70px)] m-1 p-2">
      <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {downloadables.map(
          ({ title, details, PDFDoc, apiEndPoint, cacheTag }) => (
            <div className="p-3 text-slate-900/80 bg-color-5 rounded flex flex-col gap-2">
              <h1 className=" font-bold text-2xl capitalize">{title}</h1>
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
    </div>
  );
};

export default page;
