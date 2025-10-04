import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { ProductType } from "@/types/types";
import { Star } from "lucide-react";
import { IoBookmarkOutline } from "react-icons/io5";
import { LuMinus, LuPlus } from "react-icons/lu";
import { BsCurrencyRupee } from "react-icons/bs";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import toast from "react-hot-toast";

type ProductCardType = {
  product: ProductType;
  index: number;
  loaded: boolean[];
  handleLoad: (index: number) => void;
  addCartHandler: (type: string) => void;
};

const ProductCard: React.FC<ProductCardType> = (props) => {
  const { isVerified } = useSelector((state: RootState) => state.user);
  const { product, index, loaded, handleLoad, addCartHandler } = props;
  const {
    images,
    category,
    name,
    rating,
    totalReviews,
    price,
    discountPrice,
    _id,
  } = product;
  const getId = () => {
    console.log(_id);
  };
  return (
    <Card
      key={index}
      className={`overflow-hidden shadow-none h-fit p-4 gap-3 relative group ${
        loaded[index] ? "flex" : "hidden"
      }`}
    >
      <Button
        className="rounded-sm font-medium cursor-pointer absolute top-2 right-2 hidden group-hover:block "
        variant="ghost"
        id="save"
      >
        <IoBookmarkOutline className="fill-green-800 size-5" />
      </Button>
      <CardHeader className="p-0 hover:cursor-pointer">
        <img
          src={images[0]}
          alt="img"
          loading="eager"
          onLoad={() => handleLoad(index)}
          onClick={getId}
          className="w-40 mx-auto h-40 object-cover rounded-xl"
        />
      </CardHeader>
      <CardContent className="flex items-center justify-between p-0 hover:cursor-pointer">
        <div className="flex flex-col gap-1 sm:gap-2">
          <p className="text-sm text-muted-foreground">{category}</p>
          <h3 className="text-base font-semibold">{name}</h3>
          <div className="hidden sm:flex flex-wrap items-start sm:items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                className={
                  index + 1 < rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-500">
              ({totalReviews} reviews)
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-start sm:justify-between gap-2 w-full p-0">
        <div className="inline-flex  flex-wrap items-center gap-2">
          <p className="text-xl font-bold inline-flex items-center ">
            <BsCurrencyRupee /> {discountPrice}
          </p>
          <p className="line-through text-xs text-muted-foreground">{price}</p>
        </div>
        {!true ? (
          <div className="hidden sm:flex items-center gap-2">
            <Button
              className="rounded-sm font-medium cursor-pointer "
              variant="outline"
              id="removeQuantity"
              size="sm"
              onClick={() => addCartHandler("INC")}
            >
              <LuMinus />
            </Button>
            <span>1</span>
            <Button
              className="rounded-sm font-medium cursor-pointer "
              variant="outline"
              id="addQuantity"
              size="sm"
              onClick={() => addCartHandler("DEC")}
            >
              <LuPlus />
            </Button>
          </div>
        ) : (
          <Button
            className="hidden sm:flex rounded-sm font-medium cursor-pointer text-black"
            id="addCart"
            onClick={() => {
              if (!isVerified) {
                toast.error("Please login");
                return null;
              }
              addCartHandler("ADD");
            }}
          >
            Add
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
