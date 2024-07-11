"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../_components/MyDoc";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="text-white bg-color-8 min-h-[calc(100vh-70px)] m-1 p-2">
      <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <DownloadLinkContainer />
        <DownloadLinkContainer />
        <DownloadLinkContainer />
      </div>
    </div>
  );
};

const DownloadLinkContainer = () => (
  <div className="p-3 text-slate-900/80 bg-color-5 rounded flex flex-col gap-2">
    <h1 className=" font-bold text-2xl">Download All Product</h1>
    <small className=" text-xs text-white/80 px-2">
      download all the products information as PDF including product name,
      stock, price etc
    </small>

    <button className="w-fit mt-2 px-3 py-2 rounded-full font-bold text-sm text-white bg-green-800">
      {
        <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      }
    </button>
  </div>
);

export default page;
