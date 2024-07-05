import { Schema, model, models } from "mongoose";

const OverallStatsSchema = new Schema({
  totalSales: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  totalIncome: { type: Number, default: 0 },
});

const OverallStats =
  models.OverallStats || model("OverallStats", OverallStatsSchema);

export default OverallStats;
