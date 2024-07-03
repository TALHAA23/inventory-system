import { TypeProduct } from "../_types/TypeProduct";
import Counter from "./Counter";

const ProductCard = ({ props }: { props: TypeProduct }) => {
  return (
    <div className="flex flex-col sm:flex-row border-b-2 py-3 justify-between sm:items-center">
      <div className="grow flex gap-5 items-center">
        <h1 className="font-semibold text-lg ">{props.name}</h1>
        <p>{props.salesPrice}$</p>
        <p>
          {props.qty} <span className=" text-xs font-light">stock</span>
        </p>
      </div>
      <Counter />
    </div>
  );
};

export default ProductCard;
