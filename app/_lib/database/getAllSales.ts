import connectToDB from "../utils/database";
import Sales from "@/app/_models/sales";

const getAllSales = async () => {
  await connectToDB();
  const docs = await Sales.find({}).sort({ year: -1 });
  const formattedData = docs.map((item) =>
    Object.entries(item._doc)
      .filter(([k]) => k !== "_id")
      .filter(([k, v]) => Object.keys(v as Object).length > 0)
      .reverse()
  );
  const finalData = formattedData.map((yearDoc, index) =>
    yearDoc.map((doc) => ({ month: doc[0] + (2024 - index), data: doc[1] }))
  );
  return finalData;
};

export default getAllSales;
