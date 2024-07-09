import Product from "@/app/_models/product";
import { unstable_cache as cache } from "next/cache";

const getProductById = (docId: string) => {
  return cache(
    async () => {
      const doc = await Product.findById(docId);
      return doc;
    },
    [`product-${docId}`],
    { tags: [`product-${docId}`] }
  )();
};

export default getProductById;
