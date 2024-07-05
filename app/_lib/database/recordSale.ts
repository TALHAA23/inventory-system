import Sales from "@/app/_models/sales";
import connectToDB from "../utils/database";
import { Types } from "mongoose";

const recordSale = async (
  numberOfOrders: number,
  income: number,
  revenue: number
) => {
  await connectToDB();
  const today = new Date();
  today.setMonth(today.getMonth() + 1);
  const currentYear = today.getFullYear();
  const currentMonth = today
    .toLocaleString("default", { month: "short" })
    .toLowerCase();

  const filter = { year: currentYear };
  const update = {
    $inc: {
      [`${currentMonth}.sales`]: numberOfOrders,
      [`${currentMonth}.revenue`]: revenue,
      [`${currentMonth}.income`]: income,
    },
  };
  const options = { upsert: true };
  try {
    const doc = Sales.findOneAndUpdate(filter, update, options);
    return doc;
  } catch (err) {
    console.log(err);
  }
};
export default recordSale;
