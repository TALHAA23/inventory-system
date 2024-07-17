import getOverallStats from "../_lib/database/getOverallstats";
import calculateInventoryPercentagesForToday from "../_lib/utils/calculateTodaysInventory";
import ProgressBar from "./ProgressBar";
type Props = {
  title: string;
};
const AmountSummaryCard = async ({ title }: Props) => {
  const [data, todayInfo] = await Promise.all([
    getOverallStats(),
    calculateInventoryPercentagesForToday(),
  ]);

  const isSalesCard = title == "Sales";
  return (
    <div className="grow flex justify-between items-center bg-color-6 p-4 rounded h-[100px] gap-4">
      <div>
        <h1 className="text-sm capitalize">{title}</h1>
        <h2 className=" font-bold text-2xl">
          {" "}
          {data[`total${title}`].toFixed(isSalesCard ? 0 : 2)}
          {isSalesCard ? "" : "$"}
        </h2>
        <p className="px-2 rounded-full bg-color-8 text-center text-xs w-fit tracking-tighter">
          {todayInfo[title.toLowerCase()].toFixed(3)} % today
        </p>
      </div>
      <ProgressBar progress={67} />
    </div>
  );
};

export default AmountSummaryCard;
