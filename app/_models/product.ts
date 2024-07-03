import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, require: true },
  qty: { type: Number, require: true },
  salesPrice: { type: Number, require: true },
  originalPrice: { type: Number, require: true },
  discount: { type: Number },
  category: { type: String, require: true },
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
