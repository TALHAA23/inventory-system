import Product from "@/app/_models/product";
import { TypeProduct } from "@/app/_types/TypeProduct";
import { revalidateTag } from "next/cache";
import connectToDB from "../utils/database";

const mutateProductById = async (
  docId: string,
  updates: Partial<TypeProduct>
) => {
  await connectToDB();
  const doc = await Product.findById(docId);
  if (!updates.qty) throw new Error("Restock value not found");
  if (updates?.qty > doc.qty) {
    doc.qty = updates.qty;
    doc.save();
    [
      "all-products",
      `${docId}-total-inventory`,
      "todays-inventory-info",
      "low-stock-products-all",
      "demanding-and-low-stock",
      `product-${docId}`,
    ].map((tag) => revalidateTag(tag));
    return doc;
  } else throw new Error("Restock value can't be less or same to existing one");
};

export default mutateProductById;
