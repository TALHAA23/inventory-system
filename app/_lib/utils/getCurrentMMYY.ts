const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today
  .toLocaleString("default", { month: "short" })
  .toLowerCase();
const currentMMYY = {
  year: currentYear,
  month: currentMonth,
};

export default currentMMYY;
