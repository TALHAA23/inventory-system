import { PipelineStage, Types } from "mongoose";
import connectToDB from "../utils/database";
import Product from "@/app/_models/product";
import { unstable_cache as cache } from "next/cache";
import Inventory from "@/app/_types/Inventory";
import response from "../utils/response";
import DatabaseResponse from "@/app/_types/DatabaseResponse";

const getProductTotalInventory = async (docId: string) => {
  return cache(
    async (): Promise<DatabaseResponse<Inventory>> => {
      await connectToDB();
      const pipeLine: PipelineStage[] = [
        {
          $match: {
            _id: new Types.ObjectId(docId),
          },
        },
        {
          $project: {
            qty: 1,
            originalPrice: 1,
            tempPrice: {
              $cond: {
                if: {
                  $gt: ["$discount", 0],
                },
                then: {
                  $multiply: [
                    "$salesPrice",
                    {
                      $subtract: [
                        1,
                        {
                          $divide: ["$discount", 100],
                        },
                      ],
                    },
                  ],
                },
                else: "$salesPrice",
              },
            },
          },
        },
        {
          $project: {
            income: {
              $multiply: [
                {
                  $subtract: ["$tempPrice", "$originalPrice"],
                },
                "$qty",
              ],
            },
            revenue: {
              $multiply: ["$tempPrice", "$originalPrice"],
            },
            sales: "$qty",
          },
        },
      ];
      try {
        const doc = await Product.aggregate(pipeLine);
        return response({ data: doc[0] });
      } catch (err) {
        return response({ error: "Fail to get product inventory details!" });
      }
    },
    [`${docId}-total-inventory`],
    {
      tags: [`${docId}-total-inventory`],
    }
  )();
};
export default getProductTotalInventory;
