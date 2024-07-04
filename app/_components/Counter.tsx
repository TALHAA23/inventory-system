type Props = { counter: number; updateCounter: (dir: "inc" | "dec") => void };
const Counter = ({ counter, updateCounter }: Props) => {
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
    </div>
  );
};
export default Counter;
