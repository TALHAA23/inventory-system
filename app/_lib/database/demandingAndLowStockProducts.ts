import mongoose from "mongoose";
import currentMMYY from "../utils/getCurrentMMYY";
import ProductSales from "@/app/_models/productSales";
import { unstable_cache as cache } from "next/cache";
import connectToDB from "../utils/database";
import response from "../utils/response";

const LOW_STOCK_THRESHOD_VALUE = 15;

const demandingAndLowStockProducts = cache(
  async () => {
    await connectToDB();
    const aggregation: mongoose.PipelineStage[] = [
      {
        $match: {
          [`sales.${[currentMMYY.year]}.${[currentMMYY.month]}.sales`]: {
            $gte: 20,
          },
        },
      },
      {
        $project: {
          _id: 0,
          productId: 1,
        },
      },
      {
        $lookup: {
          from: "products",
          as: "product",
          localField: "productId",
          foreignField: "_id",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          product: {
            _id: 1,
            name: 1,
            qty: 1,
          },
        },
      },
      {
        $match: {
          "product.qty": { $lte: LOW_STOCK_THRESHOD_VALUE },
        },
      },
    ];
    try {
      const docs = await ProductSales.aggregate(aggregation);
      return response({ data: docs });
    } catch (err) {
      return response({ error: "Fail to fetch Demanding low stock products!" });
    }
  },
  ["demanding-and-low-stock"],
  { tags: ["demanding-and-low-stock"] }
);

export default demandingAndLowStockProducts;
