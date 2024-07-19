import ProductSales from "@/app/_models/productSales";
import connectToDB from "../utils/database";
import Inventory from "@/app/_types/Inventory";
import { unstable_cache as cache } from "next/cache";
import response from "../utils/response";
import DatabaseResponse from "@/app/_types/DatabaseResponse";

const getProductOverallStats = async (
  docId: string
): Promise<DatabaseResponse<Inventory>> => {
  return cache(
    async () => {
      await connectToDB();
      try {
        const productSales = await ProductSales.findOne({ productId: docId });
        if (!productSales) {
          return response({ data: { revenue: 0, income: 0, sales: 0 } });
        }
        let salesSum = 0;
        let revenueSum = 0;
        let incomeSum = 0;
        for (const year in productSales.sales) {
          if (productSales.sales.hasOwnProperty(year)) {
            const yearSales = productSales.sales[year];
            for (const month in yearSales) {
              if (yearSales.hasOwnProperty(month)) {
                const currentMonth = yearSales[month];
                salesSum += currentMonth?.sales || 0;
                revenueSum += currentMonth?.revenue || 0;
                incomeSum += currentMonth?.income || 0;
              }
            }
          }
        }
        return response({
          data: { sales: salesSum, revenue: revenueSum, income: incomeSum },
        });
      } catch (err) {
        return response({ error: "Fail to get product stats!" });
      }
    },
    [`overall-inventory-${docId}`],
    {
      tags: [`overall-inventory-${docId}`],
    }
  )();
};

export default getProductOverallStats;
