import { Types } from "mongoose";

declare interface TypeProduct {
  _id: string;
  name: string;
  qty: number;
  salesPrice: number;
  originalPrice: number;
  discount: number;
  category: string;
}

export type { TypeProduct };
