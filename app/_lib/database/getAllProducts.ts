import { TypeProduct } from "@/app/_types/TypeProduct";
import connectToDB from "../utils/database";
import Product from "@/app/_models/product";

const getAllProducts = async (): Promise<TypeProduct[]> => {
  console.log("requestted");
  await connectToDB();
  const docs = await Product.find({});
  return docs;
};
export default getAllProducts;
