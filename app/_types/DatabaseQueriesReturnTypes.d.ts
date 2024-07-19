import { Types } from "mongoose";
import DatabaseResponse from "./DatabaseResponse";

// dasboard popular listing
interface Data {
  totalSales: number;
  product: {
    _id: Types.ObjectId;
    name: string;
  };
}
type PopularLisitngReturnType = DatabaseResponse<Data[]>;

export type { PopularLisitngReturnType };
