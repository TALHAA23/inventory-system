import TodaySales from "@/app/_models/todaySales";

const updateTodaySales = async (
  numberOfOrders: number,
  income: number,
  revenue: number
) => {
  const filter = { date: new Date("7/8/2024").toLocaleDateString() };
  const update = {
    $inc: {
      sales: numberOfOrders,
      revenue,
      income,
    },
  };
  const options = { upsert: true };
  const doc = TodaySales.findOneAndUpdate(filter, update, options);
  return doc;
};

export default updateTodaySales;
