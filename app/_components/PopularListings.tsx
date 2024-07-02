const TopSalesItems = () => (
  <div className="flex justify-between items-center px-1 py-[2px]">
    <p className="font-semibold">Colgate</p>
    <p className="text-xs">23 sales</p>
  </div>
);
const PopularListings = () => {
  return (
    <div className="grow  rounded bg-color-10 w-[200px] m-2">
      <h1 className="text-color-7 bg-color-1 rounded-t p-1  text-lg font-bold relative after:content-['last_month'] after:absolute after:right-0  after:font-light after:rounded-full after:px-1 after:bg-cyan-600 after:text-[10px] after:capitalize after:top-1/2 after:-translate-y-1/2">
        Top sale's
      </h1>
      <TopSalesItems />
      <TopSalesItems />
      <TopSalesItems />
      <TopSalesItems />
    </div>
  );
};

export default PopularListings;
