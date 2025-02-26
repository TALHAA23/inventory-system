import ProductSales from "@/app/_models/productSales";
import currentMMYY from "../utils/getCurrentMMYY";
import { revalidateTag } from "next/cache";

const updateProductSales = async (
  productId: string,
  numberOfOrders: number,
  income: number,
  revenue: number
) => {
  const options = { upsert: true };
  const update = {
    $inc: {
      [`sales.${currentMMYY.year}.${currentMMYY.month}.sales`]: numberOfOrders,
      [`sales.${currentMMYY.year}.${currentMMYY.month}.revenue`]: revenue,
      [`sales.${currentMMYY.year}.${currentMMYY.month}.income`]: income,
    },
  };
  const doc = await ProductSales.findOneAndUpdate(
    { productId },
    update,
    options
  );
  [
    `${productId}-12-month-stats`,
    "top-sales-of-month",
    `overall-inventory-${productId}`,
    `${productId}-current-month-sales`,
  ].map((tag) => revalidateTag(tag));
  return doc;
};
export default updateProductSales;
