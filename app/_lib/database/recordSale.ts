import connectToDB from "../utils/database";
import { Types } from "mongoose";
import updateMonthySales from "./updateMonthlySales";
import updateOverStats from "./updateOverallStats";
import updateProductSales from "./updateProductSales";

const recordSale = async (
  productId: Types.ObjectId,
  numberOfOrders: number,
  income: number,
  revenue: number
) => {
  await connectToDB();

  try {
    const promises = [
      updateMonthySales(numberOfOrders, income, revenue),
      updateOverStats(numberOfOrders, income, revenue),
      updateProductSales(productId, numberOfOrders, income, revenue),
    ];

    const result = await Promise.all(promises);
    console.log("Successfull updated database!");
    return result;
  } catch (err) {
    console.log(err);
  }
};
export default recordSale;
