import months from "./months";

export default function extractSalesIncomeRevenueForLineChart(data: {
  [key: string]: any;
}): { sales: number[]; revenue: number[]; income: number[] } | null {
  const salesData: { sales: number[]; revenue: number[]; income: number[] } = {
    sales: [],
    revenue: [],
    income: [],
  };

  // Exclude unwanted properties like _id, year, and __v
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([key]) => key !== "_id" && key !== "year" && key !== "__v"
    )
  );

  //  const monthObject: {
  //    [key: string]: { sales: number; revenue: number; income: number };
  //  } = {};
  //  for (const month of months) {
  //    monthObject[month] = filteredData[month] || {}; // Use empty object if data is missing
  //  }

  // Extract sales data from each month
  for (const month in filteredData) {
    salesData.sales.push(filteredData[month]?.sales || 0);
    salesData.revenue.push(filteredData[month]?.revenue || 0);
    salesData.income.push(filteredData[month]?.income || 0);
  }

  return salesData;
}
