import { Schema, model, models } from "mongoose";

const TotalSchema = new Schema({
  totalSales: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  totalIncome: { type: Number, default: 0 },
});

const TotalModel = models.Total || model("Total", TotalSchema);

export default TotalModel;
