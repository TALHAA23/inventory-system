import OverallStats from "@/app/_models/overallStats";
import { unstable_cache } from "next/cache";

const getOverallStats = unstable_cache(
  async () => {
    const doc = await OverallStats.findOne({});
    return doc;
  },
  ["overall-stats"],
  { tags: ["overall-stats"] }
);
export default getOverallStats;
