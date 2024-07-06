"use client";
import getPrev12MonthNames from "@/app/_lib/utils/getPrev12MonthNames";
import { LineChartData } from "@/app/_types/LineChartData";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
Chart.register(...registerables);

const LineChart = ({ sales, revenue, income }: LineChartData) => {
  const chartRef = useRef<null | HTMLCanvasElement>(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) throw new Error("Canvas Error");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: getPrev12MonthNames(),
        datasets: [
          {
            label: "income",
            data: income,
          },
          {
            label: "revenue",
            data: revenue,
          },
          {
            label: "sales",
            data: sales,
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
