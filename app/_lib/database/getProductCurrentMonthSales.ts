import Product from "@/app/_models/product";
import connectToDB from "../utils/database";
import currentMMYY from "../utils/getCurrentMMYY";
import ProductSales from "@/app/_models/productSales";
import { unstable_cache as cache } from "next/cache";
import Inventory from "@/app/_types/Inventory";
import response from "../utils/response";
import DatabaseResponse from "@/app/_types/DatabaseResponse";

const getProductCurrentMonthSales = async (docId: string) => {
  return cache(
    async (): Promise<DatabaseResponse<Inventory>> => {
      await connectToDB();
      try {
        const doc = await ProductSales.findOne({ productId: docId });
        return response({
          data: doc?.sales?.[currentMMYY.year]?.[currentMMYY.month] || {
            revenue: 0,
            income: 0,
            sales: 0,
          },
        });
      } catch (err) {
        return response({ error: `Fail to fetch ${currentMMYY.month} sales!` });
      }
    },
    [`${docId}-current-month-sales`],
    { tags: [`${docId}-current-month-sales`] }
  )();
};
export default getProductCurrentMonthSales;
