import Dashboard from "./_components/Dashboard";
import { faker } from "@faker-js/faker";
import Product from "./_models/product";
import connectToDB from "./_lib/utils/database";
import getProductOverallStats from "./_lib/database/getProductOverallStats";
const page = async () => {
  console.log(await getProductOverallStats("668522ec94f27019d200ce57"));
  return <Dashboard />;
};

const insertPlaceholderData = async () => {
  const docs = [];
  for (let i = 0; i <= 10; i++) {
    let price = parseInt(faker.commerce.price());
    docs.push({
      name: faker.commerce.productName(),
      qty: faker.number.int({ min: 10, max: 100 }),
      salesPrice: price + 10,
      originalPrice: price,
      discount: faker.number.int({ min: 0, max: 99 }),
      category: faker.commerce.department(),
    });
  }
  try {
    await connectToDB();
    const res = await Product.insertMany(docs);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export default page;
