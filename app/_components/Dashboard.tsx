import { Suspense } from "react";
import AmountSummaryCard from "./AmountSummaryCard";
import PopularListings from "./PopularListings";
import RecentOrders from "./RecentOrders";
import LineChart from "./_charts/LineChart";
import getPrevious12MonthsStats from "../_lib/database/getPrev12MonthsStats";

const cards = ["Income", "Revenue", "Sales"].map((card) => (
  <Suspense fallback="loading...">
    <AmountSummaryCard title={card} />{" "}
  </Suspense>
));

const Dashboard = async () => {
  const data = await getPrevious12MonthsStats();
  console.log(data);
  return (
    <div className="p-3">
      <div className="flex flex-wrap gap-2">{cards}</div>
      <LineChart />
      <div className="flex flex-wrap gap-0">
        <PopularListings />
        <PopularListings />
        <PopularListings />
      </div>
      <RecentOrders />
    </div>
  );
};

export default Dashboard;
