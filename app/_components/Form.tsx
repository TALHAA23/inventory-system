import { Suspense } from "react";
import getProductById from "../_lib/database/getProductbyId";
import PageSearchParams from "../_types/PageSearchParams";
import HideMutationFormButton from "./HideMutationFormButton";
import create from "../listing/server-actions/create.server";
import update from "../listing/server-actions/update.server";
import AddDummeyProductButton from "./AddDummeyProductButton";
import { faker } from "@faker-js/faker";

const formFields = [
  ["name", "text"],
  ["category", "text"],
  ["originalPrice", "number", { min: 0 }],
  ["salesPrice", "number", { min: 0 }],
  ["discount", "number", { min: 0, max: 100 }],
  ["qty", "number", { min: 1 }],
];

const Form = async ({ searchParams }: PageSearchParams) => {
  const isMutationForm = searchParams?.update !== undefined;
  const isAddingDummeyProduct = searchParams?.dummeyProduct !== undefined;
  const doc = isMutationForm
    ? await getProductById(searchParams.update as string)
    : isAddingDummeyProduct
    ? createDummeyProduct()
    : "";
  const updateWithExistingProduct = isMutationForm
    ? update.bind(null, doc)
    : "";
  return (
    <Suspense fallback="loading product...">
      <div>
        <dialog
          open={(searchParams?.update || searchParams?.addnew) !== undefined}
          id="mutation-form"
          className="w-full max-w-[500px] rounded bg-slate-900 px-3 py-2 text-white"
        >
          {isMutationForm || searchParams?.addnew ? (
            <>
              <h1 className=" text-center font-bold text-2xl">
                {isMutationForm ? `Update ${doc.name}` : "Add New Product"}
              </h1>
              <HideMutationFormButton />
              <form
                action={isMutationForm ? updateWithExistingProduct : create}
                className="space-y-1"
              >
                {formFields.map(([title, type, props]) => (
                  <div className="flex flex-col gap-1 group">
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
                      defaultValue={
                        isMutationForm || isAddingDummeyProduct
                          ? doc[title as string]
                          : ""
                      }
                      required={isMutationForm ? false : true}
                      className="pl-2 text-sm bg-transparent border-b-2 border-b-white focus:outline-none focus:border-cyan-600"
                    />
                  </div>
                ))}
                <div className="flex gap-1">
                  {!isMutationForm && <AddDummeyProductButton />}
                  <button
                    type="submit"
                    className="w-full grow-[2] rounded py-2 font-bold bg-cyan-800 border-2 border-transparent text-white hover:bg-transparent hover:border-cyan-700 transition-all duration-100 hover:shadow-md hover:shadow-cyan-700/80 active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          ) : (
            <small className=" text-center my-5">
              Waiting for URL Search Params...
            </small>
          )}
        </dialog>
      </div>
    </Suspense>
  );
};

const createDummeyProduct = () => {
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

export default Form;
