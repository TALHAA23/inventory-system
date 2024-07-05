import Sales from "@/app/_models/sales";
import currentMMYY from "../utils/getCurrentMMYY";

const updateMonthySales = async (
  numberOfOrders: number,
  income: number,
  revenue: number
) => {
  const filter = { year: currentMMYY.year };
  const update = {
    $inc: {
      [`${currentMMYY.month}.sales`]: numberOfOrders,
      [`${currentMMYY.month}.revenue`]: revenue,
      [`${currentMMYY.month}.income`]: income,
    },
  };
  const options = { upsert: true };
  const doc = Sales.findOneAndUpdate(filter, update, options);
  return doc;
};

export default updateMonthySales;
