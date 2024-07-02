"use client";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useRef } from "react";
ChartJS.register(...registerables);
const Pie = ({ percentage }: { percentage: number }) => {
  const chartRef = useRef<null | HTMLCanvasElement>(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) throw new Error("Canvas ctx not provided");
    const chart = new ChartJS(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "profit",
            data: [100, 100],
            backgroundColor: ["red", "blue"],
          },
        ],
      },
      options: {
        animation: {
          animateRotate: true,
        },
      },
    });
    return () => chart.destroy();
  });
  return <canvas ref={chartRef}></canvas>;
};

export default Pie;
