import { Suspense } from "react";
import DialogBox from "../_components/DialogBox";
import Pagination from "../_components/Pagination";
import ProductCard_Listing from "../_components/ProductCard_Listing";
import ProductInventoryDetails from "../_components/ProductInventoryDetails";
import ShowMutationFormButton from "../_components/ShowMutationFormButton";
import getProducts from "../_lib/database/getProducts";
import PageSearchParams from "../_types/PageSearchParams";
import { Metadata } from "next";
const DOCUMENTS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: "listing",
  description: "details about all the product in inventory",
};

const page = async ({ searchParams }: PageSearchParams) => {
  const page = searchParams?.page;
  const data = await getProducts(page);
  return (
    <section className="relative min-h-[calc(100vh-60px)] bg-color-4 m-1 rounded overflow-hidden p-3 space-y-2">
      <p className="text-xs rounded p-2 bg-yellow-300/35 text-yellow-950 w-fit ml-auto">
        <span className="font-semibold">Good to know:</span> Tap on product will
        open detail about that product
      </p>
      <div className="flex justify-between flex-col sm:flex-row gap-1">
        <ShowMutationFormButton buttonFor="addnew" />
        <Pagination disabled={data.length < DOCUMENTS_PER_PAGE} />
      </div>
      <DialogBox searchParams={searchParams} />
      <Header />
      <ProductInventoryDetails productId={searchParams?.d} />
      {data.map((product) => (
        <ProductCard_Listing props={product} />
      ))}
    </section>
  );
};

const Header = () => (
  <div className="border-b-2 py-2 text-sm text-white/60 capitalize grid grid-cols-[10%_40%_25%_25%]">
    {["#", "name", "price (discount applied)", "stock"].map((item) => (
      <p
        className={`${
          item === "name" ? "grow-[4]" : "grow-[2]"
        } first:grow-0 first:mr-20 `}
      >
        {item}
      </p>
    ))}
  </div>
);

export default page;
