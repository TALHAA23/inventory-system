import Sales from "@/app/_models/sales";
import Month from "@/app/_types/MonthToNum";
import extractSalesIncomeRevenueForLineChart from "../utils/extractSalesIncomeRevenueForLineChart";
import { unstable_cache as cache } from "next/cache";

const getPrevious12MonthsStats = cache(
  async () => {
    const currentYear = new Date().getFullYear();
    const prevYear = currentYear - 1;

    const [currentYearDoc, prevYearDoc] = await Promise.all([
      Sales.findOne({ year: currentYear }),
      Sales.findOne({ year: prevYear }),
    ]);

    if (!currentYearDoc) {
      console.error("Error: Current year sales data not found.");
      return null;
    }
    const mergedData: { [key: string]: any } = {};
    if (prevYearDoc) {
      for (const month in prevYearDoc.toJSON()) {
        if (Month[month] >= Month.jul && Month[month] <= Month.dec) {
          mergedData[month] = prevYearDoc[month];
        }
      }
    }
    for (const month in currentYearDoc.toJSON()) {
      mergedData[month] = currentYearDoc[month];
    }
    return extractSalesIncomeRevenueForLineChart(mergedData);
  },
  ["12-month-stats"],
  { tags: ["12-month-stats"] }
);

export default getPrevious12MonthsStats;
