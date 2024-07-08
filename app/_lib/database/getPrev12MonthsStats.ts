import Sales from "@/app/_models/sales";
import extractSalesIncomeRevenueForLineChart from "../utils/extractSalesIncomeRevenueForLineChart";
import { unstable_cache as cache } from "next/cache";
import currentMMYY from "../utils/getCurrentMMYY";
import connectToDB from "../utils/database";
import getPrev12MonthNames from "../utils/getPrev12MonthNames";
import Month from "@/app/_types/MonthToNum";
import ProductSales from "@/app/_models/productSales";
type StatsType = "for-product" | "overall";
const getPrev12monthStats = (statsType?: StatsType, docId?: string) => {
  return cache(
    async () => {
      if (statsType == "for-product" && !docId)
        throw new Error("Doc id not provided to get overall stats");
      await connectToDB();
      const currentYear = new Date().getFullYear();
      const prevYear = currentYear - 1;
      const productSalesDoc =
        docId && (await ProductSales.findOne({ productId: docId }));
      if (statsType == "for-product" && !productSalesDoc)
        return {
          sales: Array(12).fill(0),
          revenue: Array(12).fill(0),
          income: Array(12).fill(0),
        };
      const [currentYearDoc, prevYearDoc] = productSalesDoc
        ? [
            productSalesDoc.sales[currentYear] || {},
            productSalesDoc.sales[currentYear] || {},
          ]
        : await Promise.all([
            Sales.findOne({ year: currentYear }),
            Sales.findOne({ year: prevYear }),
          ]);

      if (statsType === "overall" && !currentYearDoc) {
        console.error("Error: Current year sales data not found.");
        return null;
      }
      const mergedData: { [key: string]: any } = {};
      if (prevYearDoc) {
        for (const month of getPrev12MonthNames()) {
          if (
            Month[month] > Month[currentMMYY.month] &&
            Month[month] <= Month.dec
          )
            mergedData[month] = prevYearDoc[month];
        }
      }

      for (const month of getPrev12MonthNames()) {
        if (Month[month] <= Month[currentMMYY.month])
          mergedData[month] = currentYearDoc[month];
      }
      return extractSalesIncomeRevenueForLineChart(mergedData);
    },
    [statsType == "overall" ? "12-month-stats" : `${docId}-12-month-stats`],
    {
      tags: [
        statsType == "overall" ? "12-month-stats" : `${docId}-12-month-stats`,
      ],
    }
  )();
};
export default getPrev12monthStats;
