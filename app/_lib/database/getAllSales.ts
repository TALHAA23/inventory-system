import connectToDB from "../utils/database";
import Sales from "@/app/_models/sales";
import months from "../utils/months";
import { kMaxLength } from "buffer";

const getAllSales = async () => {
  await connectToDB();
  const docs = await Sales.find({}).sort({ year: -1 });
  const d = docs.map((item) =>
    Object.entries(item._doc)
      .filter(([k]) => k !== "_id")
      .filter(([k, v]) => Object.keys(v).length > 0)
      //   .map(([k, v]) => k)
      .reverse()
      .map((item, index) => {
        console.log(index, item[0] + (2024 - index));
      })
  );
  //   console.log(d);
  return docs;
};

export default getAllSales;
