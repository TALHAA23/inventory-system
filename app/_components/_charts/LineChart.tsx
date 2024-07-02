"use client";
import months from "@/app/_lib/utils/months";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
Chart.register(...registerables);
const LineChart = () => {
  const chartRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) throw new Error("Canvas Error");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "income",
            data: [10, 20, 50, 30, 30, 150, 45, 23, 89, 56, 12, 45],
          },
          {
            label: "revenue",
            data: [10, 20, -50, 4, 30, 150],
          },
        ],
      },
    });
    return () => chart.destroy();
  });

  return (
    <div className="w-[98%] mx-auto my-5 h-fit   border-2 rounded border-gray-500">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
