import ProductSales from "@/app/_models/productSales";
import { PipelineStage, Types } from "mongoose";
import connectToDB from "../utils/database";
import Product from "@/app/_models/product";
import { unstable_cache as cache } from "next/cache";

const getTopSellingProducts = cache(
  async (): Promise<
    {
      totalSales: number;
      product: {
        _id: Types.ObjectId;
        name: string;
      };
    }[]
  > => {
    await connectToDB();
    const today = new Date();
    const currentYear = today.getFullYear();
    const shortMonth = today
      .toLocaleString("en-US", { month: "short" })
      .toLowerCase()
      .slice(0, 3);

    const pipeLine: PipelineStage[] = [
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "docs",
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the result
          productId: "$productId",
          totalSales: {
            $sum: `$sales.${currentYear}.${shortMonth}.sales`,
          },
        },
      },
      {
        $sort: {
          totalSales: -1,
        },
      },
      {
        $limit: 4,
      },
    ];
    const results = await ProductSales.aggregate(pipeLine);
    const populatedData = await Promise.all(
      results.map(async (saleData) => {
        const product = await Product.findById(saleData.productId, "name"); // Find the product based on productId
        saleData.product = product ? product : {}; // Optional: set default for missing products
        return saleData;
      })
    );
    return populatedData;
  },
  ["top-sales-of-month"],
  { tags: ["top-sales-of-month"] }
);

export default getTopSellingProducts;
