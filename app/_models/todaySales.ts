import { model, models, Schema } from "mongoose";

const TodaySalesSchema = new Schema({
  date: {
    type: String,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  income: { type: Number, require: true, default: 0 },
  revenue: { type: Number, require: true, default: 0 },
  sales: { type: Number, require: true, default: 0 },
});
TodaySalesSchema.pre("findOneAndUpdate", async (next) => {
  await TodaySales.deleteMany({
    date: {
      $ne: new Date().toLocaleDateString(),
    },
  }).exec();
  next();
});

const TodaySales = models.TodaySales || model("TodaySales", TodaySalesSchema);

export default TodaySales;
