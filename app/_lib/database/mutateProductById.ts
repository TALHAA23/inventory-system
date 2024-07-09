import Product from "@/app/_models/product";
import { TypeProduct } from "@/app/_types/TypeProduct";
import { revalidateTag } from "next/cache";

const mutateProductById = async (
  docId: string,
  updates: Partial<TypeProduct>
) => {
  const doc = Product.findByIdAndUpdate(docId, updates);
  [
    "all-products",
    `${docId}-total-inventory`,
    "todays-inventory-info",
    "low-stock-products",
    `product-${docId}`,
  ].map((tag) => revalidateTag(tag));
  return doc;
};

export default mutateProductById;
