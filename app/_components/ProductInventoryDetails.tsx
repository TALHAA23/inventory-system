import LineChart from "./_charts/LineChart";
import MultiSeriesPie from "./_charts/MultiSeriesPie";
import HideInventoryDetailsButton from "./HideInventoryDetailsButton";

const ProductInventoryDetails = ({ productId }: { productId?: string }) => {
  return (
    <div
      className={`absolute z-10 w-[calc(100%-15px)] overflow-y-auto md:w-1/2 h-[97%] bg-slate-900 text-white top-0 right-2 shadow-xl shadow-slate-800/80 rounded p-3 origin-bottom-right transition-all duration-500
    ${productId ? "scale-100" : "scale-0"}
    `}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product inventory details</h1>
        <HideInventoryDetailsButton />
      </div>
      <div className=" my-3">
        <HeadingofInfo heading="Overall stats" />
        <div className="flex gap-2">
          <DetailsTag />
          <DetailsTag />
          <DetailsTag />
        </div>
      </div>
      <div>
        <HeadingofInfo heading="Previous 12 month" />
        <LineChart
          income={[10, 23, 45, 12, 34, 67, 45, 2]}
          revenue={[34, 56, 78, 23, 45, 145, 34, 67]}
          sales={[4, 7, 2, 10, 19, 24, 16, 13, 12]}
        />
      </div>
      <div>
        <HeadingofInfo heading="Total cross current month inventory" />
        <MultiSeriesPie />
      </div>
    </div>
  );
};

const DetailsTag = () => (
  <div className="grow p-4">
    <p className="text-xs text-white/70">Sales</p>
    <h1 className="text-2xl font-bold">
      10337 <span className="text-xs text-white/80 font-normal">units</span>
    </h1>
  </div>
);

const HeadingofInfo = ({ heading }: { heading: string }) => (
  <h1 className="bg-slate-800 text-white font-bold rounded px-3 py-1 w-fit">
    {heading}
  </h1>
);

export default ProductInventoryDetails;
