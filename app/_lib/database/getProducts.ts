import Product from "@/app/_models/product";
import connectToDB from "../utils/database";
import { unstable_cache as cache } from "next/cache";
import response from "../utils/response";
import DatabaseResponse from "@/app/_types/DatabaseResponse";
import { TypeProduct } from "@/app/_types/TypeProduct";

const DOCUMENTS_PER_PAGE = 6;
const getProducts = async (pageNumber: string | undefined = "1") => {
  const skipCount =
    pageNumber === "1" ? 0 : (+pageNumber - 1) * DOCUMENTS_PER_PAGE;
  return cache(
    async (): Promise<DatabaseResponse<TypeProduct>> => {
      await connectToDB();
      try {
        const documents = await Product.find()
          .skip(skipCount)
          .limit(DOCUMENTS_PER_PAGE);
        if (!documents.length) throw new Error("Reached to end of pages");
        return response({ data: documents });
      } catch (err) {
        return response({
          error: err instanceof Error ? err.message : "fail to get items",
        });
      }
    },
    [pageNumber],
    { tags: [pageNumber, "all-products"] }
  )();
};
export default getProducts;
