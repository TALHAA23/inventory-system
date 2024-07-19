import Product from "@/app/_models/product";
import connectToDB from "../utils/database";
import { Types } from "mongoose";
import { revalidateTag } from "next/cache";

const descProductStock = async (
  productId: Types.ObjectId,
  numberToDesc: number
) => {
  await connectToDB();
  const doc = await Product.findByIdAndUpdate(
    productId,
    {
      $inc: {
        qty: -numberToDesc,
      },
    },
    { new: true }
  );
  [
    "all-products",
    "all-products-endpoint",
    "low-stock-products-all",
    "demanding-and-low-stock",
    "monthly-recored-for-pdf",
    `product-${productId}`,
  ].map((tag) => revalidateTag(tag));
  console.log(doc);
};

export default descProductStock;
