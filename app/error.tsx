"use client";
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="h-[calc(100vh-60px)] flex flex-col gap-2 items-center justify-center font-light">
      <h1 className=" text-white font-bold text-2xl">{error.message}</h1>
      <button
        onClick={reset}
        className=" w-full max-w-[300px] rounded py-2 font-bold text-white bg-green-800"
      >
        Try Again!
      </button>
    </div>
  );
};

export default Error;
