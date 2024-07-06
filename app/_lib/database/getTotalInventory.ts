import Product from "@/app/_models/product";
import Inventory from "@/app/_types/Inventory";

export default async function getTotalInventory(): Promise<Inventory> {
  const products = await Product.find();
  const totalProducts = products.reduce((acc, product) => acc + product.qty, 0);
  const totalRevenue = products.reduce((acc, product) => {
    const discountedPrice = product.discount
      ? product.salesPrice * (1 - product.discount / 100)
      : product.salesPrice;
    return acc + discountedPrice * product.qty;
  }, 0);

  const totalIncome = products.reduce((acc, product) => {
    const discountedPrice = product.discount
      ? product.salesPrice * (1 - product.discount / 100)
      : product.salesPrice;
    return acc + discountedPrice * product.qty;
  }, 0);

  return {
    income: totalIncome, // Add calculated income
    sales: totalProducts,
    revenue: totalRevenue,
  };
}
