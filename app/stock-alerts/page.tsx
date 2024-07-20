import demandingAndLowStockProducts from "../_lib/database/demandingAndLowStockProducts";
import getAllLowStockProducts from "../_lib/database/getAllLowStockProduct";
import currentMMYY from "../_lib/utils/getCurrentMMYY";
import { TypeProduct } from "../_types/TypeProduct";
import ShowRestockingFormButton from "../_components/ShowRestockingFormButton";
import PageSearchParams from "../_types/PageSearchParams";
import RestockingForm from "../_components/RestockingForm";
import ComponentError from "../_components/ComponentError";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Low Stock Alerts",
  description: "Product with low stock alert to restock them",
};

const page = async ({ searchParams }: PageSearchParams) => {
  const data = await getAllLowStockProducts();
  const dataset2 = await demandingAndLowStockProducts();

  return (
    <section className="relative m-2 bg-color-4 text-white p-2 rounded min-h-[calc(100vh-80px)] space-y-2">
      <h1 className=" text-2xl font-bold">Low Stock Alerts</h1>
      <div>
        <HeadingofInfo
          heading={`Demanding prodcuts of ${currentMMYY.month} with low stock value`}
        />
        {dataset2?.error ? (
          <ComponentError errorMessage={dataset2.error} />
        ) : (
          <CreateContainers
            data={dataset2.data.map((item: any) => item.product)}
          />
        )}
      </div>
      <div>
        <HeadingofInfo heading="Other Low on stock products" />
        {data?.error ? (
          <ComponentError errorMessage={data.error} />
        ) : (
          <CreateContainers data={data.data} />
        )}
      </div>
      {searchParams?.restock && (
        <RestockingForm
          restockId={searchParams.restock}
          currentStock={
            [...data.data, ...dataset2.data].find(
              (item) => item._id === searchParams.restock
            )?.qty
          }
        />
      )}
    </section>
  );
};

const HeadingofInfo = ({ heading }: { heading: string }) => (
  <h1 className="bg-slate-800 text-white font-bold rounded px-3 py-1 w-fit capitalize">
    {heading}
  </h1>
);

const CreateContainers = ({ data }: { data: Partial<TypeProduct>[] }) => {
  if (!data.length)
    return (
      <p className=" text-center text-sm text-slate-900/80 my-10">
        No restock needed!
      </p>
    );
  return (
    <div className="text-black grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-2">
      {data.map((product: Partial<TypeProduct>, index) => (
        <div
          key={index}
          className="w-full p-3 rounded bg-color-8 flex justify-between items-center text-sm"
        >
          <h1 className="">
            {(product?.name || "").length > 20
              ? product?.name?.substring(0, 20) + "..."
              : product?.name}
          </h1>
          <p className="font-bold">{product?.qty} lefts</p>
          {product._id && (
            <ShowRestockingFormButton productId={product._id?.toString()} />
          )}
        </div>
      ))}
    </div>
  );
};
export default page;
