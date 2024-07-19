import connectToDB from "../utils/database";
import { Types } from "mongoose";
import updateMonthySales from "./updateMonthlySales";
import updateOverStats from "./updateOverallStats";
import updateProductSales from "./updateProductSales";
import updateTodaySales from "./updateTodaySales";
import descProductStock from "./descProductStock";

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
      updateTodaySales(numberOfOrders, income, revenue),
      descProductStock(productId, numberOfOrders),
    ];

    const result = await Promise.all(promises);
    console.log("Successfull updated database!");
    return result;
  } catch (err) {
    console.log(err);
  }
};
export default recordSale;
