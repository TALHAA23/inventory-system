import OverallStats from "@/app/_models/overallStats";
import { unstable_cache } from "next/cache";
import response from "../utils/response";

const getOverallStats = unstable_cache(
  async () => {
    try {
      const doc = await OverallStats.findOne({});
      return response({ data: doc });
    } catch (err) {
      return response({ error: "Fail to fetch Stats" });
    }
  },
  ["overall-stats"],
  { tags: ["overall-stats"] }
);
export default getOverallStats;
