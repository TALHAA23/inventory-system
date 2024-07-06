import { LineChartData } from "@/app/_types/LineChartData";

export default function extractSalesIncomeRevenueForLineChart(data: {
  [key: string]: any;
}): LineChartData {
  const salesData: { sales: number[]; revenue: number[]; income: number[] } = {
    sales: [],
    revenue: [],
    income: [],
  };

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([key]) => key !== "_id" && key !== "year" && key !== "__v"
    )
  );

  for (const month in filteredData) {
    salesData.sales.push(filteredData[month]?.sales || 0);
    salesData.revenue.push(filteredData[month]?.revenue || 0);
    salesData.income.push(filteredData[month]?.income || 0);
  }

  return salesData;
}
