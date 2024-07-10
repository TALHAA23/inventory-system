import Product from "@/app/_models/product";
import mongoose from "mongoose";
import connectToDB from "../utils/database";
import { unstable_cache as cache } from "next/cache";

const LOW_STOCK_THRESHOD_VALUE = 15;

const getAllLowStockProducts = cache(
  async () => {
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
    ];
    const docs = await Product.aggregate(pipeLine);
    return docs;
  },
  ["low-stock-products-all"],
  { tags: ["low-stock-products-all"] }
);

export default getAllLowStockProducts;
