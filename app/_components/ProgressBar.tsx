"use client";
import { Flat } from "@alptugidin/react-circular-progress-bar";
const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="h-full aspect-square z-10">
      <Flat
        progress={progress}
        range={{ from: 0, to: 100 }}
        sx={{
          strokeColor: "#03045E",
          barWidth: 10,
          bgStrokeColor: "#CAF0F8",
          valueSize: 25,
          valueWeight: "bold",
          miniCircleColor: "#03045E",
        }}
      />
    </div>
  );
};

export default ProgressBar;
