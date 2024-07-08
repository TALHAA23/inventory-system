import Inventory from "@/app/_types/Inventory";
import getTodayInventory from "../database/getTodayInventory";
import getTotalInventory from "../database/getTotalInventory";
import { unstable_cache as cache } from "next/cache";
import zeroInventoryInfo from "./zeroInventoryInfo";

const calculateInventoryPercentagesForToday = cache(
  async () => {
    const totalInventory = await getTotalInventory();
    const todayInventory = await getTodayInventory();

    if (!todayInventory) return zeroInventoryInfo;

    const percentages: Inventory = {
      income: 0,
      revenue: 0,
      sales: 0,
    };
    percentages.income =
      totalInventory.income > 0
        ? (todayInventory.income / totalInventory.income) * 100
        : 0;
    percentages.revenue =
      totalInventory.revenue > 0
        ? (todayInventory.revenue / totalInventory.revenue) * 100
        : 0;
    percentages.sales =
      totalInventory.sales > 0
        ? (todayInventory.sales / totalInventory.sales) * 100
        : 0;
    return percentages;
  },
  ["todays-inventory-info"],
  { tags: ["todays-inventory-info"] }
);

export default calculateInventoryPercentagesForToday;
