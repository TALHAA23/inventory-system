import TodaySales from "@/app/_models/todaySales";
import { revalidateTag } from "next/cache";

const updateTodaySales = async (
  numberOfOrders: number,
  income: number,
  revenue: number
) => {
  const filter = { date: new Date().toLocaleDateString() };
  const update = {
    $inc: {
      sales: numberOfOrders,
      revenue,
      income,
    },
  };
  const options = { upsert: true };
  const doc = TodaySales.findOneAndUpdate(filter, update, options);
  ["top-sales-of-month", "todays-inventory-info"].map((tag) =>
    revalidateTag(tag)
  );
  return doc;
};

export default updateTodaySales;
