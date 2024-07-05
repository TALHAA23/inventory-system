import months from "./months";

export default function getPrev12MonthNames(): string[] {
  const currentMonth = new Date().getMonth();
  const startIndex = (currentMonth + 1) % 12; // Index for starting month (next month of prev year)
  const monthArray: string[] = [];

  // Add months from next month of previous year until December
  for (let i = startIndex; i <= 11; i++) {
    monthArray.push(months[i]);
  }

  // Add months from January of current year until current month
  for (let i = 0; i <= currentMonth; i++) {
    monthArray.push(months[i]);
  }

  return monthArray.slice(0, 12); // Ensure only 12 unique months are returned
}
