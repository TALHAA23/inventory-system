"use server";
import mutateProductById from "@/app/_lib/database/mutateProductById";
import serverActionDefaultResponse from "@/app/_lib/utils/serverActionDefaultResponse";
import productSchema from "@/app/_lib/utils/typeSafty/productSchema";
import { TypeProduct } from "@/app/_types/TypeProduct";
const update = async (existingProduct: TypeProduct, formData: FormData) => {
  console.log("Updating...");
  const docId = existingProduct._id;
  const modifiedFormData: Partial<TypeProduct> = productSchema.parse(
    Object.fromEntries(formData.entries())
  );
  for (let key in modifiedFormData)
    if (modifiedFormData[key] === existingProduct[key])
      delete modifiedFormData[key];
  if (!Object.keys(modifiedFormData).length) {
    throw new Error("Nothing to update");
  }
  try {
    throw new Error();
    await mutateProductById(docId, modifiedFormData);
    return serverActionDefaultResponse;
  } catch (err) {
    throw new Error("Couldn't update product at the movement!");
  }
};

export default update;
