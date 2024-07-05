"use server";

import recordSale from "@/app/_lib/database/recordSale";
import calculateIncomePerItem from "@/app/_lib/utils/calculateIncomePerItem";
import takeDiscount from "@/app/_lib/utils/takeDiscount";
import { TypeProduct } from "@/app/_types/TypeProduct";

interface Payload extends TypeProduct {
  orderQty: number;
}

export default async function placeOrder(payload: Payload) {
  if (payload.orderQty > payload.qty) throw new Error("Order quantity exceed!");
  const totalCost = payload.salesPrice * payload.orderQty;
  const discountPrice = payload.discount
    ? takeDiscount(totalCost, payload.discount)
    : 0;
  const income = calculateIncomePerItem(
    payload.originalPrice,
    discountPrice || payload.salesPrice
  );
  const revenue = discountPrice || totalCost;
  const response = await recordSale(
    payload._id,
    payload.orderQty,
    income,
    revenue
  );
  console.log(response);
}
