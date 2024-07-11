"use client";
import React, { useState } from "react";
import FormStatus from "./FormStatus";
import updateStock from "../stock-alerts/server-actions/updateStock.server";
import { toast } from "react-toastify";

const RestockingForm = ({
  restockId,
  currentStock,
}: {
  restockId: string;
  currentStock: number;
}) => {
  const [error, setError] = useState<null | string>(null);
  const updateStockWithId = updateStock.bind(null, restockId);

  const clientAction = async (formData: FormData) => {
    if (parseInt(formData.get("qty") as string) <= currentStock) {
      setError("Re-stock value can't be  less or same to existing.");
      return;
    }
    const res = await updateStockWithId(formData);
    res.error ? setError(res.error) : toast.success(res.message);
  };

  return (
    <div className="absolute right-2 top-2 rounded bg-slate-900 p-2">
      {restockId ? (
        <form action={clientAction}>
          <label htmlFor="qty" className=" block text-xs text-white/75">
            How much you want to re-stock?
          </label>
          {error && (
            <p className=" text-center text-xs text-red-800">{error}</p>
          )}
          <input
            type="number"
            name="qty"
            id="qty"
            className="w-full bg-transparent focus:outline-none border-b-2 border-white focus:border-cyan-800"
          />
          <FormStatus error={error} queryKeyToDelete={["restock"]} />
        </form>
      ) : (
        <small>waiting for URL Search params</small>
      )}
    </div>
  );
};

export default RestockingForm;
