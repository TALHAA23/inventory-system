import Product from "@/app/_models/product";
import { TypeProduct } from "@/app/_types/TypeProduct";
import { revalidateTag } from "next/cache";

const createNewProduct = async (product: Partial<TypeProduct>) => {
  const doc = await new Product(product).save();
  ["all-products", "todays-inventory-info"].map((tag) => revalidateTag(tag));
  return doc;
};
export default createNewProduct;
