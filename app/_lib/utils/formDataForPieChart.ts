import Inventory from "@/app/_types/Inventory";
import { MultiSeriesPie } from "@/app/_types/MultiSeriesPie";

export default function formDataForPieChart(
  totalInventory: Inventory,
  monthyInventory: Inventory
): MultiSeriesPie {
  const combinedObject: any = {};
  const keys = ["revenue", "income", "sales"];

  for (const key of keys) {
    combinedObject[key] = [totalInventory[key], monthyInventory[key]];
  }

  return combinedObject as MultiSeriesPie;
}
