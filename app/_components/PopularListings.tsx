import ComponentError from "./ComponentError";
import { PopularLisitngReturnType } from "../_types/DatabaseQueriesReturnTypes";

type MetaData = "sales" | "low stock";
interface Props {
  metadata: MetaData;
  promise: () => Promise<PopularLisitngReturnType>;
}
interface TopSalesProps {
  name: string;
  sales: number;
  metadata: MetaData;
}
const TopSalesItems = ({ name, sales, metadata }: TopSalesProps) => (
  <div className="flex justify-between items-center px-1 py-[2px]">
    <p className="font-semibold">{name}</p>
    <p className="text-xs">
      {sales} {metadata == "sales" ? "sales" : "left"}
    </p>
  </div>
);
const PopularListings = async ({ metadata, promise }: Props) => {
  const data = await promise();
  const isTopSalesListing = metadata == "sales";
  return (
    <div className="grow  rounded bg-color-10 w-[200px] m-2">
      {data?.error ? (
        <ComponentError errorMessage={data.error} />
      ) : (
        <>
          <h1
            className={`text-color-7 bg-color-1 rounded-t p-1  text-lg font-bold relative after:content-['this_month'] after:absolute after:right-0  after:font-light after:rounded-full after:px-1 after:bg-cyan-600 after:text-[10px] after:capitalize after:top-1/2 after:-translate-y-1/2 ${
              !isTopSalesListing && "after:hidden"
            }`}
          >
            {isTopSalesListing ? "Top Sales" : "Low on Stock"}
          </h1>
          {data?.data?.map((item: any, index) => (
            <TopSalesItems
              key={index}
              metadata={metadata}
              name={item?.product?.name || item?.name}
              sales={item?.totalSales || item?.qty}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default PopularListings;
