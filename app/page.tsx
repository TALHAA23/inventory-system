import connectToDB from "./_lib/utils/database";

const page = async () => {
  await connectToDB();
  return <div>Home</div>;
};

export default page;
