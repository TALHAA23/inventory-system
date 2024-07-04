import { Schema, model, models } from "mongoose";

const SalesSchema = new Schema({
  year: {
    type: Number,
    require: true,
    default: new Date().getFullYear(),
  },
  jul: {
    sales: { type: Number, require: true, default: 0 },
  },
});

const Sales = models.Sales || model("Sales", SalesSchema);
export default Sales;

// import { Schema, model, models } from "mongoose";

// const MonthlySalesSchema = new Schema(
//   {
//     year: { type: Number, required: true },
//     months: [
//       {
//         month: { type: Number, required: true, min: 1, max: 12 },
//         sales: { type: Number, required: true },
//         revenue: { type: Number, required: true },
//         income: { type: Number, require: true }, // Optional for income calculation
//       },
//     ],
//   },
//   { strict: true }
// );

// const SalesSchema = new Schema(
//   {
//     productId: {
//       type: Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     totalSales: { type: Number, default: 0 },
//     totalRevenue: { type: Number, default: 0 },
//     totalIncome: { type: Number, default: 0 },
//     monthlySalesData: [MonthlySalesSchema],
//     // monthlySalesData: {
//     //   type: Schema.Types.Subdocument,
//     //   schema: new Schema({
//     //     year: { type: Number, required: true },
//     //     months: [
//     //       {
//     //         month: { type: Number, required: true, min: 1, max: 12 },
//     //         sales: { type: Number, required: true },
//     //         revenue: { type: Number, required: true },
//     //         income: { type: Number, require: true }, // Optional for income calculation
//     //       },
//     //     ],
//     //   }),
//     // },
//   },
//   { strict: true }
// );
// const Sales = models.Sales || model("Sales", SalesSchema);
// export default Sales;
