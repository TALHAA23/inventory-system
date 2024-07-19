import ProductSales from "@/app/_models/productSales";
import { PipelineStage } from "mongoose";
import connectToDB from "../utils/database";
import Product from "@/app/_models/product";
import { unstable_cache as cache } from "next/cache";
import response from "../utils/response";
import { PopularLisitngReturnType } from "@/app/_types/DatabaseQueriesReturnTypes";

const getTopSellingProducts = cache(
  async (): Promise<PopularLisitngReturnType> => {
    await connectToDB();
    const today = new Date();
    const currentYear = today.getFullYear();
    const shortMonth = today
      .toLocaleString("en-US", { month: "short" })
      .toLowerCase()
      .slice(0, 3);

    const pipeLine: PipelineStage[] = [
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
    try {
      const results = await ProductSales.aggregate(pipeLine);
      const populatedData = await Promise.all(
        results.map(async (saleData) => {
          const product = await Product.findById(saleData.productId, "name");
          saleData.product = product ? product : {};
          return saleData;
        })
      );
      return response({ data: populatedData });
    } catch (err) {
      return response({ error: "Fail to fetch Top Selling items!" });
    }
  },
  ["top-sales-of-month"],
  { tags: ["top-sales-of-month"] }
);

export default getTopSellingProducts;
