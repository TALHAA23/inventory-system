"use client";

import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const updateCounter = (dir: "inc" | "dec") => {
    setCounter((prev) => (dir == "inc" ? prev + 1 : prev == 0 ? 0 : prev - 1));
  };

  return (
    <div className="self-end sm:self-auto flex  items-center">
      <button
        onClick={() => updateCounter("dec")}
        className="rounded-l-full  py-2 px-2 bg-green-950 text-white text-xs"
      >
        -
      </button>
      <p className="py-2 px-2 bg-white text-black text-xs">{counter}</p>
      <button
        onClick={() => updateCounter("inc")}
        className="rounded-r-full py-2 px-2 bg-green-950 text-white text-xs"
      >
        +
      </button>
      <button
        disabled={counter === 0}
        className="rounded-full mx-2 py-2 px-4 bg-green-950 text-white text-xs disabled:opacity-60"
      >
        Buy
      </button>
    </div>
  );
};
export default Counter;
