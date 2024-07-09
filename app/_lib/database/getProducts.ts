import Product from "@/app/_models/product";
import connectToDB from "../utils/database";
import { unstable_cache as cache } from "next/cache";

const DOCUMENTS_PER_PAGE = 6;
const getProducts = async (pageNumber: string | undefined = "1") => {
  const skipCount =
    pageNumber === "1" ? 0 : (+pageNumber - 1) * DOCUMENTS_PER_PAGE;
  return cache(
    async () => {
      await connectToDB();
      const documents = await Product.find()
        .skip(skipCount)
        .limit(DOCUMENTS_PER_PAGE);
      return documents;
    },
    [pageNumber],
    { tags: [pageNumber, "all-products"] }
  )();
};
export default getProducts;
