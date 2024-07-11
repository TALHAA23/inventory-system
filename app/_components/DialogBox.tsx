import { Suspense } from "react";
import getProductById from "../_lib/database/getProductbyId";
import PageSearchParams from "../_types/PageSearchParams";
import HideMutationFormButton from "./HideMutationFormButton";
import MutationForm from "./MutationForm";

const DialogBox = async ({ searchParams }: PageSearchParams) => {
  const isMutationForm = searchParams?.update !== undefined;
  const doc = isMutationForm
    ? await getProductById(searchParams.update as string)
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
              <MutationForm searchParams={searchParams} data={doc} />
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

export default DialogBox;
