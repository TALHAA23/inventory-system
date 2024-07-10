"use server";
import createNewProduct from "@/app/_lib/database/createNewProduct";
import serverActionDefaultResponse from "@/app/_lib/utils/serverActionDefaultResponse";
import productSchema from "@/app/_lib/utils/typeSafty/productSchema";
import { TypeProduct } from "@/app/_types/TypeProduct";

const create = async (formData: FormData) => {
  const modifiedFormData: Partial<TypeProduct> = productSchema.parse(
    Object.fromEntries(formData.entries())
  );
  for (const key in modifiedFormData)
    if (key.startsWith("$ACTION")) delete modifiedFormData[key];
  try {
    await new Promise((res) => setTimeout(res, 5000));
    throw new Error();
    const res = await createNewProduct(modifiedFormData);
    return serverActionDefaultResponse;
  } catch (err) {
    throw new Error("Couldn't upload product, please try later!");
  }
};

export default create;
