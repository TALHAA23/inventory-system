import { PipelineStage, Types } from "mongoose";
import connectToDB from "../utils/database";
import Product from "@/app/_models/product";
import { unstable_cache as cache } from "next/cache";
import Inventory from "@/app/_types/Inventory";

const getProductTotalInventory = async (docId: string) => {
  return cache(
    async (): Promise<Inventory> => {
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

      const doc = await Product.aggregate(pipeLine);
      return doc[0];
    },
    [`${docId}-total-inventory`],
    {
      tags: [`${docId}-total-inventory`],
    }
  )();
};
export default getProductTotalInventory;
