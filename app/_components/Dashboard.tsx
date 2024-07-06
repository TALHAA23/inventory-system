import { Suspense } from "react";
import AmountSummaryCard from "./AmountSummaryCard";
import PopularListings from "./PopularListings";
import RecentOrders from "./RecentOrders";
import LineChart from "./_charts/LineChart";
import getPrevious12MonthsStats from "../_lib/database/getPrev12MonthsStats";
import { LineChartData } from "../_types/LineChartData";
import getTopSellingProducts from "../_lib/database/getTopSales";
import getLowStockProducts from "../_lib/database/getLowStockProducts";
import { revalidateTag } from "next/cache";

const cards = ["Income", "Revenue", "Sales"].map((card) => (
  <Suspense fallback="loading...">
    <AmountSummaryCard title={card} />{" "}
  </Suspense>
));

const Dashboard = () => {
  // ! revalidate low-stock-products tag in product qty update
  return (
    <div className="p-3">
      <div className="flex flex-wrap gap-2">{cards}</div>
      <Suspense fallback="chart loading...">
        {getPrevious12MonthsStats().then((data) => (
          <LineChart {...data} />
        ))}
      </Suspense>
      {/* <LineChart {...data} /> */}
      <div className="flex flex-wrap gap-0">
        <Suspense fallback="loading...">
          <PopularListings metadata="sales" promise={getTopSellingProducts} />
        </Suspense>
        <Suspense fallback="loading...">
          <PopularListings metadata="low stock" promise={getLowStockProducts} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
