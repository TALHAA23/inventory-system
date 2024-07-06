import Sales from "@/app/_models/sales";
import extractSalesIncomeRevenueForLineChart from "../utils/extractSalesIncomeRevenueForLineChart";
import { unstable_cache as cache } from "next/cache";
import currentMMYY from "../utils/getCurrentMMYY";
import connectToDB from "../utils/database";
import getPrev12MonthNames from "../utils/getPrev12MonthNames";
import Month from "@/app/_types/MonthToNum";
const getPrevious12MonthsStats = cache(
  async () => {
    await connectToDB();
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
  ["12-month-stats"],
  { tags: ["12-month-stats"] }
);

export default getPrevious12MonthsStats;
