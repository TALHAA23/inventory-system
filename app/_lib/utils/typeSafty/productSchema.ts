import { z } from "zod";
export default z.object({
  _id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  qty: z.string().transform((value) => {
    if (typeof value === "string") {
      const parsedNumber = parseFloat(value);
      if (isNaN(parsedNumber)) {
        throw new Error("Invalid quantity format");
      }
      return parsedNumber;
    }
    return value; // Already a number, no change
  }),
  salesPrice: z
    .string()
    // .positive("Sales price must be a positive number")
    .transform((value) => {
      if (typeof value === "string") {
        const parsedNumber = parseFloat(value);
        if (isNaN(parsedNumber)) {
          throw new Error("Invalid sales price format");
        }
        return parsedNumber;
      }
      return value; // Already a number, no change
    }),
  originalPrice: z
    .string()
    // .negative("Original price cannot be negative")
    .transform((value) => {
      if (typeof value === "string") {
        const parsedNumber = parseFloat(value);
        if (isNaN(parsedNumber)) {
          throw new Error("Invalid original price format");
        }
        return parsedNumber;
      }
      return value; // Already a number, no change
    }),
  discount: z
    .string()
    // .negative("Discount cannot be negative")
    .transform((value) => {
      if (typeof value === "string") {
        const parsedNumber = parseFloat(value);
        if (isNaN(parsedNumber)) {
          throw new Error("Invalid discount format");
        }
        return parsedNumber;
      }
      return value; // Already a number, no change
    }),
  category: z.string(),
});
