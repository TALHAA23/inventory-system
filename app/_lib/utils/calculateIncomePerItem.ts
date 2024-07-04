export default function calculateIncomePerItem(
  originalPrice: number,
  salePrice: number
): number {
  if (typeof originalPrice !== "number" || typeof salePrice !== "number") {
    throw new Error("Inputs must be numbers");
  }

  const income = salePrice - originalPrice;

  return income;
}
