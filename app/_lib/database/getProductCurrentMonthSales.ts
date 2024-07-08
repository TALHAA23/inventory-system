import Product from "@/app/_models/product";
import connectToDB from "../utils/database";
import currentMMYY from "../utils/getCurrentMMYY";
import ProductSales from "@/app/_models/productSales";
import { unstable_cache as cache } from "next/cache";
import Inventory from "@/app/_types/Inventory";

const getProductCurrentMonthSales = async (docId: string) => {
  return cache(
    async (): Promise<Inventory> => {
      await connectToDB();
      const doc = await ProductSales.findOne({ productId: docId });
      return (
        doc?.sales?.[currentMMYY.year]?.[currentMMYY.month] || {
          revenue: 0,
          income: 0,
          sales: 0,
        }
      );
    },
    [`${docId}-current-month-sales`],
    { tags: [`${docId}-current-month-sales`] }
  )();
};
export default getProductCurrentMonthSales;
