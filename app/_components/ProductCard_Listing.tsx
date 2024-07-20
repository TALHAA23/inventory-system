import { TypeProduct } from "../_types/TypeProduct";
import takeDiscount from "../_lib/utils/takeDiscount";
import ShowProductIventoryDetailsButtons from "./ShowProductIventoryDetailsButtons";
import ShowMutationFormButton from "./ShowMutationFormButton";
import Image from "next/image";
interface ExtendedTypeProduct extends TypeProduct {
  income?: string;
  discountPrice?: string;
}
const ProductCard_Listing = ({ props }: { props: ExtendedTypeProduct }) => {
  const salePriceAfterDiscount = takeDiscount(
    props?.salesPrice,
    props?.discount
  );
  props.discountPrice = salePriceAfterDiscount.toFixed(2);
  props.income = (
    (props.discount ? salePriceAfterDiscount : props.salesPrice) -
    props.originalPrice
  ).toFixed(2);
  return (
    <details className="w-full rounded  bg-color-10  content-center open:bg-cyan-600 open:border-2 p-1 open:border-cyan-950/50 ">
      <summary className=" grid grid-cols-[50%_25%_25%] md:grid-cols-[10%_40%_25%_25%]  items-center  text-sm md:py-0 cursor-pointer">
        <div className="relative hidden md:block h-[50px] aspect-square object-cover rounded border-gray-600/30">
          <Image fill src="/images/shoe.jpg" alt="shoe" />
        </div>
        <p>{props?.name}</p>
        <p>{props?.salesPrice}$</p>
        <p>{props.qty} stock</p>
      </summary>
      <div className=" border-t-2 my-2 flex flex-col md:flex-row h-auto md:h-56 py-2">
        <div className="md:h-full w-full md:w-auto aspect-square p-4">
          <div className="relative h-full aspect-square object-cover rounded-2xl border-gray-600/30">
            <Image fill src="/images/shoe.jpg" alt="shoe" />
          </div>
        </div>
        <div className="grow flex flex-col justify-between">
          <div className="p-4 flex gap-5 flex-wrap">
            {[
              ["_id", props._id],
              ["name", props.name],
              ["category", props.category],
              ["quantity", props.qty],
              ["original Price", props.originalPrice],
              ["sales Price", props.salesPrice],
              ["discount", props.discount],
              ["discount price", props.discountPrice],
              ["income", props.income],
            ].map(([key, value], index) => (
              <DetailsTag key={index} title={key as string} value={value} />
            ))}
          </div>
          <div className="flex justify-end">
            <ShowMutationFormButton
              buttonFor="update"
              id={props._id.toString()}
            />
            <ShowProductIventoryDetailsButtons id={props._id.toString()} />
          </div>
        </div>
      </div>
    </details>
  );
};

const DetailsTag = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="grow">
    <p className="text-xs text-white/70 capitalize">{title}</p>
    <h1
      className={`text-sm border-b border-slate-900 ${
        title == "income" &&
        (value as number) < 0 &&
        "text-red-800 font-semibold"
      }`}
    >
      {title == "discount" ? `${value}%` : value}
    </h1>
  </div>
);

export default ProductCard_Listing;
