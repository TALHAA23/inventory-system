import { revalidatePath } from "next/cache";

const mutateProductQty = async (docId: string) => {
  [`${docId}-total-inventory`, "todays-inventory-info", "low-stock-products"];
  revalidatePath("/shop");
};
