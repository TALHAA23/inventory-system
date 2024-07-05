"use client";
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div
      onClick={reset}
      className="fixed rounded bg-red-600/70 text-sm text-white px-4 py-2 right-2 top-[80px]"
    >
      {error.message}
    </div>
  );
};

export default Error;
