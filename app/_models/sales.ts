import { Schema, model, models } from "mongoose";
const monthFieldSchema = {
  sales: { type: Number },
  revenue: { type: Number },
  income: { type: Number },
};
const SalesSchema = new Schema({
  year: {
    type: Number,
    require: true,
    default: new Date().getFullYear(),
  },
  jan: monthFieldSchema,
  feb: monthFieldSchema,
  mar: monthFieldSchema,
  api: monthFieldSchema,
  may: monthFieldSchema,
  jun: monthFieldSchema,
  jul: monthFieldSchema,
  aug: monthFieldSchema,
  sep: monthFieldSchema,
  oct: monthFieldSchema,
  nov: monthFieldSchema,
  dec: monthFieldSchema,
});

const Sales = models.Sales || model("Sales", SalesSchema);
export default Sales;
