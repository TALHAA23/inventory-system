import AmountSummaryCard from "./AmountSummaryCard";
import PopularListings from "./PopularListings";
import RecentOrders from "./RecentOrders";
import LineChart from "./_charts/LineChart";

const cards = Array(3).fill(
  <AmountSummaryCard
    title="Income"
    value={12000}
    todayInfo={3}
    percentage={26}
  />
);

const Dashboard = () => {
  return (
    <div className="p-3">
      <div className="flex flex-wrap gap-2">{cards}</div>
      {/* <LineChart /> */}
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
