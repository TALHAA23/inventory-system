import Sales from "@/app/_models/sales";
import extractSalesIncomeRevenueForLineChart from "../utils/extractSalesIncomeRevenueForLineChart";
import { unstable_cache as cache } from "next/cache";
import currentMMYY from "../utils/getCurrentMMYY";
import connectToDB from "../utils/database";
import getPrev12MonthNames from "../utils/getPrev12MonthNames";
import Month from "@/app/_types/MonthToNum";
import ProductSales from "@/app/_models/productSales";
import DatabaseResponse from "@/app/_types/DatabaseResponse";
import { LineChartData } from "@/app/_types/LineChartData";
import response from "../utils/response";
type StatsType = "for-product" | "overall";
const getPrev12monthStats = (statsType?: StatsType, docId?: string) => {
  return cache(
    async (): Promise<DatabaseResponse<LineChartData>> => {
      try {
        if (statsType == "for-product" && !docId)
          throw new Error("Doc id not provided to get overall stats");
        await connectToDB();
        const currentYear = new Date().getFullYear();
        const prevYear = currentYear - 1;
        const productSalesDoc =
          docId && (await ProductSales.findOne({ productId: docId }));
        if (statsType == "for-product" && !productSalesDoc)
          return response({
            data: {
              sales: Array(12).fill(0),
              revenue: Array(12).fill(0),
              income: Array(12).fill(0),
            },
          });
        const [currentYearDoc, prevYearDoc] = productSalesDoc
          ? [
              productSalesDoc.sales[currentYear] || {},
              productSalesDoc.sales[prevYear] || {},
            ]
          : await Promise.all([
              Sales.findOne({ year: currentYear }),
              Sales.findOne({ year: prevYear }),
            ]);
        if (statsType === "overall" && !currentYearDoc) {
          console.error("Error: Current year sales data not found.");
          return response({ error: "Current year sales data not found" });
        }

        const mergedData: { [key: string]: any } = {};
        for (const month of getPrev12MonthNames()) {
          if (
            (Month as any)[month] > (Month as any)[currentMMYY.month] &&
            (Month as any)[month] <= Month.dec
          )
            mergedData[month] = prevYearDoc?.[month] || {};
        }

        for (const month of getPrev12MonthNames()) {
          if ((Month as any)[month] <= (Month as any)[currentMMYY.month])
            mergedData[month] = currentYearDoc[month] || {};
        }
        return response({
          data: extractSalesIncomeRevenueForLineChart(mergedData),
        });
      } catch (err) {
        console.error(err);
        return response({
          error: "Fail to draw line chart for 12 months inventory!",
        });
      }
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
