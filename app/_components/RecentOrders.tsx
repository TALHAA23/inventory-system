const headers = ["purchase date", "item name", "id", "price", "edit"];
const RecentOrders = () => {
  return (
    <div className=" bg-color-9 rounded">
      <h1 className=" font-bold text-xl px-1 pt-2">Last Orders</h1>
      <small className=" font-light px-1">Last update 15min ago</small>
      <Header />
      <div className="text-center">
        <CreateListing />
        <CreateListing />
        <CreateListing />
      </div>
    </div>
  );
};

const Header = () => (
  <ul className="grid grid-cols-[20%_20%_10%_10%_10%]  text-sm bg-color-3 p-2 text-center">
    {headers.map((item, index) => (
      <li key={index} className=" capitalize">
        {item}
      </li>
    ))}
  </ul>
);

const CreateListing = () => (
  <ul className=" grid grid-cols-[auto_auto_auto_auto_40px]  text-sm py-1 gap-0">
    <li>item </li>
    <li>item </li>
    <li>item </li>
    <li>item </li>
    <li>item </li>
  </ul>
);

export default RecentOrders;
