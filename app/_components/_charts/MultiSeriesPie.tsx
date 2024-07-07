"use client";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";
Chart.register(...registerables);
const MultiSeriesPie = () => {
  const ref = useRef<null | HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = ref.current.getContext("2d");
    if (!ctx) throw new Error("Canvas Error: Ctx not available");
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["A", "a", "B", "b", "C", "c"],
        datasets: [
          {
            data: [10, 40],
          },
          {
            data: [30, 40],
          },
          {
            data: [10, 2],
          },
        ],
      },
    });
    return () => chart.destroy();
  }, []);

  return <canvas ref={ref}></canvas>;
};

export default MultiSeriesPie;
