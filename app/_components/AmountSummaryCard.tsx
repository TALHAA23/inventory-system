import Pie from "./_charts/Pie";
type Props = {
  title: string;
  value: number;
  todayInfo: number;
  percentage: number;
};
const AmountSummaryCard = ({ title, value, todayInfo, percentage }: Props) => {
  return (
    <div className="grow flex justify-between items-center bg-color-6 p-4 rounded h-[100px] gap-4">
      <div>
        <h1 className="text-sm">{title}</h1>
        <h2 className=" font-bold text-2xl">{value}$</h2>
        <p className=" px-2 rounded-full bg-color-8 text-center text-[10px] w-fit tracking-tighter">
          {todayInfo}% today
        </p>
      </div>
      <Pie percentage={percentage} />
    </div>
  );
};

export default AmountSummaryCard;
