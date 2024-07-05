import { useFormStatus } from "react-dom";

const BuyButton = ({ counter }: { counter: number }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || counter === 0}
      className="rounded-full mx-2 py-2 px-4 bg-green-950 text-white text-xs disabled:opacity-60"
    >
      {pending ? "Buying..." : "Buy"}
    </button>
  );
};

export default BuyButton;
