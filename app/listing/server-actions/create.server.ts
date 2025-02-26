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
    await createNewProduct(modifiedFormData);
    return serverActionDefaultResponse({
      message: "Product uploaded successfully",
    });
  } catch (err) {
    return serverActionDefaultResponse({ error: (err as Error).message });
  }
};

export default create;
