import Sales from "@/app/_models/sales";
import connectToDB from "../utils/database";
import { MongoClient } from "mongodb";
import { Types } from "mongoose";

const recordSale = async (
  numberOfOrders: number,
  income: number,
  revenue: number
) => {
  // await connectToDB();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today
    .toLocaleString("default", { month: "short" })
    .toLowerCase(); // Get short month name
  const response = await new MongoClient(
    "mongodb+srv://inventary:DADAsKikFAPuXQ3@inventarymangmentsys.tgpelic.mongodb.net/?retryWrites=true&w=majority&appName=inventaryMangmentSys"
  )
    .db()
    .collection("sales")
    .insertOne({
      [currentMonth]: {
        $inc: {
          sales: numberOfOrders,
        },
      },
    });

  return;
  try {
    const salesDoc = await Sales.findOneAndUpdate(
      { year: currentYear }, // Search by year field
      {
        [currentMonth]: {
          $inc: {
            sales: numberOfOrders,
            // revenue,
            // income,
          },
        },
      }, // Update based on dynamic month field
      // { $inc: updateObject }, // Update based on dynamic month field,
      { upsert: true }
    );
    if (!salesDoc) {
      console.log(`Created new sales document for year ${currentYear}`);
    } else {
      console.log(`Updated sales document for year ${currentYear}`);
    }
    return salesDoc;
  } catch (error) {
    console.error("Error updating sales:", error);
    throw error; // Re-throw error for handling
  }
};
export default recordSale;

// Assuming you have a SalesModel defined elsewhere (refer to previous examples)

// Assuming you have a SalesModel defined elsewhere (refer to previous examples)

// Assuming you have a SalesModel defined elsewhere (refer to previous examples)

// import { Schema, Types } from "mongoose";
// import connectToDB from "../utils/database";
// import Sales from "@/app/_models/sales";

// export default async function recordOrder(
//   productId: Types.ObjectId,
//   numberOfOrders: number,
//   income: number,
//   revenue: number
// ) {
//   await connectToDB(); // Replace with your actual database connection logic
//   const today = new Date();
//   const currentYear = today.getFullYear();
//   // await testFilter(productId, currentYear);
//   // return;
//   const currentMonth = today.getMonth() + 1; // Months are 0-indexed
//   Sales.findByIdAndUpdate(productId, {
//     $inc: {
//       totalSales: 10,
//     },
//   });
//   const update = {
//     $inc: {
//       totalSales: numberOfOrders,
//       totalRevenue: revenue,
//       totalIncome: income,
//     },
//     $addToSet: {
//       // Update or create sub document within monthlySalesData
//       monthlySalesData: {
//         $filter: {
//           // Find the existing document for the current year
//           input: "$monthlySalesData",
//           as: "yearData",
//           cond: { $eq: ["$$yearData.year", currentYear] },
//         },
//         $setOnInsert: {
//           // Create new sub document for the current year if it doesn't exist
//           year: currentYear,
//           months: [1, 2, 3], // Initialize empty months array
//         },
//         // $push: {
//         //   // Update or create month object within the year's months array
//         //   year: currentYear,
//         //   months: {
//         //     $setOnInsert: {
//         //       // Create new month object if it doesn't exist within the year
//         //       month: currentMonth,
//         //       sales: 0,
//         //       revenue: 0,
//         //       income: 0, // Initialize income to 0 if optional
//         //     },
//         //     $inc: {
//         //       // Update sales, revenue, and income for the current month
//         //       sales: { $inc: numberOfOrders },
//         //       revenue: { $inc: revenue },
//         //       income: { $inc: income },
//         //     },
//         //   },
//         // },
//       },
//     },
//   };

//   const options = { upsert: true, new: true }; // Create if not exists, return updated doc

//   try {
//     const saleDoc = await Sales.findOneAndUpdate(
//       { productId },
//       update,
//       options
//     );
//     if (!saleDoc) {
//       console.log("Created a new sales document for product");
//     } else {
//       console.log("Updated existing sales document for product");
//     }
//     return saleDoc; // Return the updated document (optional)
//   } catch (error) {
//     console.error("Error recording order:", error);
//     throw error; // Re-throw the error for handling in the calling code
//   }
// }

// // Assuming your existing SalesSchema with monthlySalesData

// async function testFilter(productId: Types.ObjectId, currentYear: number) {
//   const update = {
//     $filter: {
//       // Filter monthlySalesData for documents with matching year
//       input: { $getField: "monthlySalesData" },
//       as: "yearData",
//       cond: {}, // Access year field directly
//     },
//   };

//   try {
//     const saleDoc = await Sales.findOne({ productId }, update); // Find document with filter
//     if (saleDoc) {
//       console.log("Filtered document:", saleDoc.monthlySalesData); // Log filtered data
//       return saleDoc.monthlySalesData; // Return filtered data (optional)
//     } else {
//       console.log("No document found with productId:", productId);
//       return null; // Indicate no document found (optional)
//     }
//   } catch (error) {
//     console.error("Error during filtering:", error);
//     throw error; // Re-throw error for handling
//   }
// }
