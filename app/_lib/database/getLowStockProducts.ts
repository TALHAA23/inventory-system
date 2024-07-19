import Product from "@/app/_models/product";
import mongoose from "mongoose";
import connectToDB from "../utils/database";
import { unstable_cache as cache } from "next/cache";
import { PopularLisitngReturnType } from "@/app/_types/DatabaseQueriesReturnTypes";
import response from "../utils/response";

const LOW_STOCK_THRESHOD_VALUE = 15;

const getLowStockProducts = cache(
  async (): Promise<PopularLisitngReturnType> => {
    await connectToDB();
    const pipeLine: mongoose.PipelineStage[] = [
      {
        $match: {
          qty: {
            $lte: LOW_STOCK_THRESHOD_VALUE,
          },
        },
      },
      {
        $project: {
          name: 1,
          qty: 1,
        },
      },
      {
        $sort: {
          qty: 1,
        },
      },
      {
        $limit: 4,
      },
    ];
    try {
      const docs = await Product.aggregate(pipeLine);
      return response({ data: docs });
    } catch (err) {
      return response({ error: "Fail to fetch Low Stock items!" });
    }
  },
  ["low-stock-products"],
  { tags: ["low-stock-products"] }
);

export default getLowStockProducts;
