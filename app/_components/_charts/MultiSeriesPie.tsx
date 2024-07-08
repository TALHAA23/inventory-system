"use client";
import currentMMYY from "@/app/_lib/utils/getCurrentMMYY";
import { MultiSeriesPieData } from "@/app/_types/MultiSeriesPieData";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
Chart.register(...registerables);
const MultiSeriesPie = ({ data }: { data: MultiSeriesPieData }) => {
  const ref = useRef<null | HTMLCanvasElement>(null);
  const month = `${currentMMYY.month}`;
  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext("2d");
    if (!ctx) throw new Error("Canvas Error: Ctx not available");
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "possible revenue",
          `${month} revenue`,
          "possible income",
          `${month} income`,
          "sales",
          `${month} sales`,
        ],
        datasets: [
          {
            data: data.revenue,
          },
          {
            data: data.income,
          },
          {
            data: data.sales,
          },
        ],
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <canvas
      ref={ref}
      aria-label="multi series pie to show total makeable inventory cross this month inventory"
      role="img"
    ></canvas>
  );
};

export default MultiSeriesPie;
