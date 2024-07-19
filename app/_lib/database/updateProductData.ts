import Product from "@/app/_models/product";
import { TypeProduct } from "@/app/_types/TypeProduct";
import { revalidateTag } from "next/cache";
import connectToDB from "../utils/database";

const updateProductData = async (
  docId: string,
  updates: Partial<TypeProduct>
) => {
  await connectToDB();
  const doc = await Product.findByIdAndUpdate(docId, updates);
  [
    "all-products",
    "all-products-endpoint",
    `${docId}-total-inventory`,
    "todays-inventory-info",
    "low-stock-products-all",
    "demanding-and-low-stock",
    "monthly-recored-for-pdf",
    `product-${docId}`,
  ].map((tag) => revalidateTag(tag));
  return doc;
};

export default updateProductData;
