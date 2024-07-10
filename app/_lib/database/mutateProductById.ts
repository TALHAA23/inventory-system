import Product from "@/app/_models/product";
import { TypeProduct } from "@/app/_types/TypeProduct";
import { revalidateTag } from "next/cache";
import connectToDB from "../utils/database";

const mutateProductById = async (
  docId: string,
  updates: Partial<TypeProduct>
) => {
  await connectToDB();
  const doc = await Product.findByIdAndUpdate(docId, updates);
  if (doc.qty !== updates.qty)
    [
      "all-products",
      `${docId}-total-inventory`,
      "todays-inventory-info",
      "low-stock-products-all",
      "demanding-and-low-stock",
      `product-${docId}`,
    ].map((tag) => revalidateTag(tag));
  return doc;
};

export default mutateProductById;
