import { Types } from "mongoose";

interface TypeProduct {
  _id: Types.ObjectId;
  name: string;
  qty: number;
  salesPrice: number;
  originalPrice: number;
  discount: number;
  category: string;
}

export type { TypeProduct };
