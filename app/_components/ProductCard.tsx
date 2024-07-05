"use client";
import { useState } from "react";
import { TypeProduct } from "../_types/TypeProduct";
import Counter from "./Counter";
import placeOrder from "../shop/server-actions/placeorder.server";
import BuyButton from "./BuyButton";

const ProductCard = ({ props }: { props: TypeProduct }) => {
  const [counter, setCounter] = useState(0);
  const updateCounter = (dir: "inc" | "dec") => {
    setCounter((prev) =>
      dir == "inc"
        ? prev == props.qty
          ? prev
          : prev + 1
        : prev == 0
        ? 0
        : prev - 1
    );
  };

  const placeOrderWithCounter = placeOrder.bind(null, {
    ...props,
    orderQty: counter,
  });

  return (
    <div className="flex flex-col sm:flex-row border-b-2 py-3 justify-between sm:items-center">
      <div className="grow flex gap-5 items-center">
        <h1 className="font-semibold text-lg ">{props.name}</h1>
        <p>{props.salesPrice}$</p>
        <p>
          {props.qty} <span className=" text-xs font-light">stock</span>
        </p>
      </div>
      <Counter counter={counter} updateCounter={updateCounter} />
      <form action={placeOrderWithCounter}>
        <BuyButton counter={counter} />
      </form>
    </div>
  );
};

export default ProductCard;
