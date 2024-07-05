import { model, models, Schema } from "mongoose";

const ProductSalesSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Products" },
  sales: { type: Schema.Types.Mixed },
});

const ProductSales =
  models.ProductSales || model("ProductSales", ProductSalesSchema);
export default ProductSales;
