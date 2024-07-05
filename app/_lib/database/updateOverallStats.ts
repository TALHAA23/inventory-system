import OverallStats from "@/app/_models/overallStats";
import { revalidateTag } from "next/cache";

const updateOverStats = async (
  numberOfOrders: number,
  income: number,
  revenue: number
) => {
  const update = {
    $inc: {
      totalSales: numberOfOrders,
      totalRevenue: revenue,
      totalIncome: income,
    },
  };
  const options = { upsert: true };
  const doc = await OverallStats.findOneAndUpdate({}, update, options);
  revalidateTag("overall-stats");
  return doc;
};

export default updateOverStats;
