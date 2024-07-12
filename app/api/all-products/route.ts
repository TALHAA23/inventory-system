import getAllProducts from "@/app/_lib/database/getAllProducts";

export const GET = async () => {
  try {
    const data = await getAllProducts();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
