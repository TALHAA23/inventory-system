import Inventory from "@/app/_types/Inventory";
import { MultiSeriesPieData } from "@/app/_types/MultiSeriesPieData";

export default function formDataForPieChart(
  totalInventory: Inventory,
  monthyInventory: Inventory
): MultiSeriesPieData {
  const combinedObject: any = {};
  const keys = ["revenue", "income", "sales"];

  for (const key of keys) {
    combinedObject[key] = [totalInventory[key], monthyInventory[key]];
  }

  return combinedObject as MultiSeriesPieData;
}
