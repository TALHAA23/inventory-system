import Product from "@/app/_models/product";

export default async function getTotalInventory(): Promise<{
  totalInventoryCost: number;
  totalProducts: number;
  totalRevenue: number;
}> {
  const products = await Product.find();

  const totalInventoryCost = products.reduce(
    (acc, product) => acc + product.originalPrice * product.qty,
    0
  );

  const totalProducts = products.reduce((acc, product) => acc + product.qty, 0);

  const totalRevenue = products.reduce((acc, product) => {
    const discountedPrice = product.discount
      ? product.salesPrice * (1 - product.discount / 100)
      : product.salesPrice;
    return acc + discountedPrice * product.qty;
  }, 0);

  return {
    totalInventoryCost,
    totalProducts,
    totalRevenue,
  };
}
