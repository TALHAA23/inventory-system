import getAllSales from "@/app/_lib/database/getAllSales";

export const GET = async () => {
  try {
    const data = await getAllSales();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
