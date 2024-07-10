"use server";

import mutateProductById from "@/app/_lib/database/mutateProductById";
import serverActionDefaultResponse from "@/app/_lib/utils/serverActionDefaultResponse";

const updateStock = async (docId: string, formData: FormData) => {
  if (!formData.get("qty"))
    throw new Error("Quantity not provided to re-stock");
  const data = { qty: parseInt(formData.get("qty") as string) };
  await mutateProductById(docId, data);
  return serverActionDefaultResponse;
};

export default updateStock;
