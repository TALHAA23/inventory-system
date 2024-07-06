import TodaySales from "@/app/_models/todaySales";
import Inventory from "@/app/_types/Inventory";

const getTodayInventory = async (): Promise<Inventory> => {
  const filter = { date: new Date().toLocaleDateString() };
  const doc = await TodaySales.findOne(filter);
  return doc;
};
export default getTodayInventory;
