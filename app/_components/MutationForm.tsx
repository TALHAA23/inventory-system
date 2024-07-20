"use client";
import create from "../listing/server-actions/create.server";
import { toast } from "react-toastify";
import PageSearchParams from "../_types/PageSearchParams";
import { TypeProduct } from "../_types/TypeProduct";
import { faker } from "@faker-js/faker";
import update from "../listing/server-actions/update.server";
import FormStatus from "./FormStatus";
import { useState } from "react";

const formFields = [
  ["name", "text"],
  ["category", "text"],
  ["originalPrice", "number", { min: 0 }],
  ["salesPrice", "number", { min: 0 }],
  ["discount", "number", { min: 0, max: 100 }],
  ["qty", "number", { min: 1 }],
];
interface Props extends PageSearchParams {
  data: TypeProduct;
}
const MutationForm = ({ searchParams, data }: Props) => {
  const [defaultFormData, setDefaultFormData] =
    useState<Partial<TypeProduct>>(data);
  const isMutationForm = searchParams?.update !== undefined;

  const handleClick = () => {
    setDefaultFormData(createDummeyProduct());
  };

  const clientAction = async (formData: FormData) => {
    const response = isMutationForm
      ? await update.bind(null, data)(formData)
      : await create(formData);
    response?.error
      ? toast.error(response.error)
      : toast.success(response.message);
  };

  return (
    <form action={clientAction} className="space-y-1">
      <FormStatus
        tailwindClasses="text-center"
        queryKeyToDelete={["addnew", "update", "dummeyProduct"]}
      />
      {formFields.map(([title, type, props], index) => (
        <div key={index} className="flex flex-col gap-1 group">
          <label
            htmlFor={title as string}
            className=" text-sm text-white/70 group-focus-within:text-cyan-600"
          >
            {title as string}
          </label>
          <input
            type={type as string}
            {...(props as object)}
            name={title as string}
            defaultValue={defaultFormData[title as string] || ""}
            required={isMutationForm ? false : true}
            className="pl-2 text-sm bg-transparent border-b-2 border-b-white focus:outline-none focus:border-cyan-600"
          />
        </div>
      ))}
      <div className="flex gap-1">
        {!isMutationForm && (
          <button
            onClick={handleClick}
            type="button"
            className=" text-xs bg-cyan-400 rounded  py-2 font-bold text-black"
          >
            Create dummey product
          </button>
        )}
        <button
          type="submit"
          className="w-full grow-[2] rounded py-2 font-bold bg-cyan-800 border-2 border-transparent text-white hover:bg-transparent hover:border-cyan-700 transition-all duration-100 hover:shadow-md hover:shadow-cyan-700/80 active:scale-95"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const createDummeyProduct = (): Partial<TypeProduct> => {
  let price = parseInt(faker.commerce.price());
  return {
    name: faker.commerce.productName(),
    qty: faker.number.int({ min: 10, max: 100 }),
    salesPrice: price + 35,
    originalPrice: price,
    discount: faker.number.int({ min: 0, max: 99 }),
    category: faker.commerce.department(),
  };
};

export default MutationForm;
