const months = Array.from({ length: 12 }, (_, i) =>
  new Date(2024, i, 1).toLocaleString("en-US", { month: "long" })
);
console.log(months);
export default months;
