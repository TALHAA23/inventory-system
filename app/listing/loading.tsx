const loading = () => {
  return (
    <section className="relative min-h-[calc(100vh-60px)] bg-slate-300 m-1 rounded overflow-hidden p-3 space-y-2 animate-pulse">
      <div className="h-6 w-fit bg-slate-400 rounded p-2"></div>{" "}
      <div className="flex justify-between gap-1">
        <div className="h-8 w-20 bg-slate-400 rounded"></div>{" "}
        <div className="flex justify-end gap-1">
          <div className="w-full h-5 bg-slate-400 rounded flex flex-wrap">
            <div className="w-1/5 h-full bg-slate-200 rounded-l"></div>
            <div className="w-1/5 h-full bg-slate-200 rounded"></div>
            <div className="w-1/5 h-full bg-slate-200 rounded"></div>
            <div className="w-1/5 h-full bg-slate-200 rounded"></div>
            <div className="w-1/5 h-full bg-slate-200 rounded-r"></div>
          </div>
        </div>
      </div>
      <div className="h-8 bg-slate-400 rounded p-2"></div>{" "}
      <div className="grid grid-cols-[10%_40%_25%_23%] gap-2 animate-pulse">
        <div className="h-6 bg-slate-400 rounded"></div>
        <div className="h-6 bg-slate-400 rounded"></div>
        <div className="h-6 bg-slate-400 rounded"></div>
        <div className="h-6 bg-slate-400 rounded"></div>
      </div>
      <div className="h-[calc(100vh-230px)] bg-slate-400"></div>
    </section>
  );
};

export default loading;
