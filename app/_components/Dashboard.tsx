import React, { Suspense } from "react";
import AmountSummaryCard from "./AmountSummaryCard";
import PopularListings from "./PopularListings";
import LineChart from "./_charts/LineChart";
import getPrevious12MonthsStats from "../_lib/database/getPrev12MonthsStats";
import getTopSellingProducts from "../_lib/database/getTopSales";
import getLowStockProducts from "../_lib/database/getLowStockProducts";
import AmountSummaryCardSkeleton from "./Skeletons/AmountSummaryCardSkeleton";
import PopularListingsSkeleton from "./Skeletons/PopularListingsSkeleton";
const cards = ["Income", "Revenue", "Sales"].map((card) => (
  <Suspense fallback={<AmountSummaryCardSkeleton />}>
    <AmountSummaryCard title={card} />
  </Suspense>
));

const Dashboard = () => {
  return (
    <div className="p-3">
      <div className="flex flex-wrap gap-2">{cards}</div>
      <Suspense
        fallback={
          <div className="w-[98%] h-[300px] mx-auto my-5 border-2 rounded bg-gray-500 animate-pulse"></div>
        }
      >
        {getPrevious12MonthsStats("overall").then((data) => (
          <LineChart {...data} />
        ))}
      </Suspense>
      <div className="flex flex-wrap gap-0">
        <Suspense fallback={<PopularListingsSkeleton />}>
          <PopularListings metadata="sales" promise={getTopSellingProducts} />
        </Suspense>

        <Suspense fallback={<PopularListingsSkeleton />}>
          <PopularListings metadata="low stock" promise={getLowStockProducts} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
