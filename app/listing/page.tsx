import DialogBox from "../_components/DialogBox";
import Pagination from "../_components/Pagination";
import ProductCard_Listing from "../_components/ProductCard_Listing";
import ProductInventoryDetails from "../_components/ProductInventoryDetails";
import ShowMutationFormButton from "../_components/ShowMutationFormButton";
import getProducts from "../_lib/database/getProducts";
import PageSearchParams from "../_types/PageSearchParams";
import { TypeProduct } from "../_types/TypeProduct";
import ComponentError from "../_components/ComponentError";
import getProductById from "../_lib/database/getProductbyId";

const DOCUMENTS_PER_PAGE = 6;

export const generateMetadata = async ({ searchParams }: PageSearchParams) => {
  const doc =
    searchParams?.d !== undefined && (await getProductById(searchParams.d));
  return {
    title: searchParams?.addnew
      ? "Upload"
      : searchParams?.update
      ? "Update Product"
      : searchParams?.d
      ? doc.name
      : `Listing Page ${searchParams?.page || 1}`,
  };
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
        <Pagination disabled={data?.data?.length < DOCUMENTS_PER_PAGE} />
      </div>
      <DialogBox searchParams={searchParams} />
      <Header />
      <ProductInventoryDetails productId={searchParams?.d} />
      {data?.error ? (
        <ComponentError errorMessage={data.error} />
      ) : (
        data?.data?.map((product: TypeProduct, index: number) => (
          <ProductCard_Listing key={index} props={product} />
        ))
      )}
    </section>
  );
};

const Header = () => (
  <div className="border-b-2 py-2 text-sm text-white/60 capitalize grid grid-cols-[10%_40%_25%_25%]">
    {["#", "name", "price (discount applied)", "stock"].map((item, index) => (
      <p
        key={index}
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
