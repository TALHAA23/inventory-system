import ProductSales from "@/app/_models/productSales";
import mongoose from "mongoose";
import connectToDB from "../utils/database";

const getProductOverallStats = async (
  docId: string
): Promise<{ sales: number; revenue: number; income: number }> => {
  await connectToDB();
  const pipeline = [
    { $match: { productId: new mongoose.Types.ObjectId(docId) } }, // Filter by document ID

    {
      $unwind: "$sales", // Unwind the 'sales' object into separate documents for each year
    },
    {
      $project: {
        _id: 0, // Exclude _id from the result
        year: "$_id", // Extract the year from the unwound document's _id
        sales: {
          $objectToArray: "$sales", // Convert year-month object into an array of key-value pairs
        },
      },
    },
    {
      $unwind: "$sales", // Unwind the 'sales' array containing year-month pairs
    },
    {
      $project: {
        _id: 0, // Exclude _id from the result
        year: "$year",
        month: "$sales.k", // Extract the month key from the unwound pair
        value: "$sales.v", // Extract the value (sales, revenue, or income)
      },
    },
  ];

  const results = await ProductSales.aggregate(pipeline);
  if (results.length === 0) {
    throw new Error("Product sales document not found");
  }

  return results[0]; // Access the first (and hopefully only) result
};

export default getProductOverallStats;
