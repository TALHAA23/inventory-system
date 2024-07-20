import { Metadata } from "next";
import ProductCard from "../_components/ProductCard";
import getProducts from "../_lib/database/getProducts";
import Pagination from "../_components/Pagination";
import PageSearchParams from "../_types/PageSearchParams";
import { TypeProduct } from "../_types/TypeProduct";
import ComponentError from "../_components/ComponentError";

const DOCUMENTS_PER_PAGE = 6;

export const metadata: Metadata = {
  title: "Shop",
  description: "shop to buy product",
};
const page = async ({ searchParams }: PageSearchParams) => {
  const pageNumber = searchParams?.page;
  const data = await getProducts(pageNumber);
  return (
    <section className=" m-2 text-white">
      <h1 className=" font-bold text-4xl">
        Shop - Buy Products and see changes
      </h1>
      <p className="bg-green-400/15 rounded p-2 text-xs my-2">
        Buy dummey product to reflect on your dashboard. each purchase will be
        recored and the change information will be reflected on dashboard and
        each product invertory page. The quantily will be updated if reach 0
        will require to re-stock the product. with the help of this test shop
        stock alerts, charts, movements can be recorded to make it dynamic
      </p>
      <div className="bg-color-10 rounded p-3">
        <Pagination disabled={data.data?.length < DOCUMENTS_PER_PAGE} />
        {data?.error ? (
          <ComponentError errorMessage={data.error} />
        ) : (
          data.data?.map((product: TypeProduct, index: number) => (
            <ProductCard key={index} props={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default page;
