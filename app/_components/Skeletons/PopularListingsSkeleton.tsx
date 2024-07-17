const PopularListingsSkeleton = () => {
  return (
    <div className="grow rounded bg-slate-300 w-[200px] m-2 animate-pulse">
      <div className="h-8 bg-slate-400 rounded-t p-1"></div>
      <div className="flex flex-col space-y-2 px-1 py-2">
        <div className="h-4 bg-slate-400 rounded"></div>
        <div className="h-4 bg-slate-400 rounded"></div>
        <div className="h-4 bg-slate-400 rounded"></div>
      </div>
    </div>
  );
};

export default PopularListingsSkeleton;
