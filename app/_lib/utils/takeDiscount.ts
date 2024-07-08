export default function takeDiscount(
  totalValue: number,
  discountPercentage: number
): number {
  // Validate input types (optional but recommended)
  // if (
  //   typeof totalValue !== "number" ||
  //   typeof discountPercentage !== "number"
  // ) {
  //   throw new Error("Inputs must be numbers");
  // }

  // Ensure discount percentage is within valid range (0 to 100)
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Discount percentage must be between 0 and 100");
  }

  // Calculate discount value (avoid unnecessary type conversion)
  const discountValue = totalValue * (discountPercentage / 100);
  const discountedPrice = totalValue - discountValue;

  return discountedPrice;
}
