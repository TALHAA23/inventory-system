const Loader = () => {
  return (
    <div className="grow animate-pulse flex justify-between items-center bg-slate-300 p-4 rounded h-[100px] gap-4">
      <div>
        <div className="h-5 w-16 mb-1 bg-slate-400 rounded-lg"></div>{" "}
        <div className="h-8 w-24 mb-2 bg-slate-400 rounded-lg"></div>{" "}
        <div className="h-4 w-20 px-2 rounded-full bg-slate-400 text-center"></div>{" "}
      </div>
      <div className="h-2 w-full bg-slate-400 rounded"></div>{" "}
    </div>
  );
};

export default Loader;
