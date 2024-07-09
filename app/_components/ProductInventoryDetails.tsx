import getPrev12monthStats from "../_lib/database/getPrev12MonthsStats";
import getProductCurrentMonthSales from "../_lib/database/getProductCurrentMonthSales";
import getProductOverallStats from "../_lib/database/getProductOverallStats";
import getProductTotalInventory from "../_lib/database/getProductTotalInventory";
import formDataForPieChart from "../_lib/utils/formDataForPieChart";
import currentMMYY from "../_lib/utils/getCurrentMMYY";
import LineChart from "./_charts/LineChart";
import MultiSeriesPie from "./_charts/MultiSeriesPie";
import HideInventoryDetailsButton from "./HideInventoryDetailsButton";

const ProductInventoryDetails = async ({
  productId,
}: {
  productId?: string;
}) => {
  if (!productId) return;
  const [overallInventory, prev12monthStats, totalInventory, salesofTheMonth] =
    await Promise.all([
      getProductOverallStats(productId),
      getPrev12monthStats("for-product", productId),
      getProductTotalInventory(productId),
      getProductCurrentMonthSales(productId),
    ]);
  return (
    <div
      className={`fixed top-[55px] right-2 z-10 w-[calc(100%-10px)] max-w-[500px] h-[calc(100%-70px)] overflow-y-auto bg-slate-900 text-white shadow-xl shadow-slate-800/80 rounded p-3 origin-bottom-right transition-all duration-500
    ${productId ? "scale-100" : "scale-0"}
    `}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          Product inventory details
        </h1>
        <HideInventoryDetailsButton />
      </div>
      <div className=" my-3">
        <HeadingofInfo heading="Overall stats" />
        <div className="flex gap-2">
          {Object.entries(overallInventory).map(([key, value]) => (
            <DetailsTag title={key} value={value} />
          ))}
        </div>
      </div>
      {prev12monthStats && (
        <div>
          <HeadingofInfo heading="Previous 12 month" />
          <LineChart {...prev12monthStats} />
        </div>
      )}
      <div>
        <HeadingofInfo
          heading={`makeable cross ${currentMMYY.month} inventory data`}
        />
        <MultiSeriesPie
          data={formDataForPieChart(totalInventory, salesofTheMonth)}
        />
      </div>
    </div>
  );
};

const DetailsTag = ({ title, value }: { title: string; value: number }) => (
  <div className="grow p-4">
    <p className="text-xs text-white/70 capitalize">{title}</p>
    <h1 className="text-2xl font-bold">
      {value.toFixed(title == "sales" ? 0 : 2)}
      <span className="text-xs text-white/80 font-normal">
        {" "}
        {title == "sales" ? "unit(s)" : "$"}
      </span>
    </h1>
  </div>
);

const HeadingofInfo = ({ heading }: { heading: string }) => (
  <h1 className="bg-slate-800 text-white font-bold rounded px-3 py-1 w-fit capitalize">
    {heading}
  </h1>
);

export default ProductInventoryDetails;
