"use server";
import mutateProductById from "@/app/_lib/database/mutateProductById";
import serverActionDefaultResponse from "@/app/_lib/utils/serverActionDefaultResponse";
import productSchema from "@/app/_lib/utils/typeSafty/productSchema";
import { TypeProduct } from "@/app/_types/TypeProduct";
const update = async (existingProduct: TypeProduct, formData: FormData) => {
  const docId = existingProduct._id;
  const modifiedFormData: Partial<TypeProduct> = productSchema.parse(
    Object.fromEntries(formData.entries())
  );
  for (let key in modifiedFormData)
    if (modifiedFormData[key] === existingProduct[key])
      delete modifiedFormData[key];
  const numberofFieldToUpdate = Object.keys(modifiedFormData).length;
  if (!numberofFieldToUpdate)
    return serverActionDefaultResponse({ error: "Nothing to update" });

  try {
    await mutateProductById(docId, modifiedFormData);
    return serverActionDefaultResponse({
      message: `Successfully update ${numberofFieldToUpdate} properties of ${existingProduct.name.substring(
        0,
        20
      )}`,
    });
  } catch (err) {
    return serverActionDefaultResponse({
      error: "Couldn't update at the movement",
    });
  }
};

export default update;
