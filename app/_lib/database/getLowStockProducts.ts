import Product from "@/app/_models/product";
import mongoose from "mongoose";
import connectToDB from "../utils/database";
import { unstable_cache as cache } from "next/cache";

const LOW_STOCK_THRESHOD_VALUE = 20;

const getLowStockProducts = cache(
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
  ["low-stock-products"],
  { tags: ["low-stock-products"] }
);

export default getLowStockProducts;
