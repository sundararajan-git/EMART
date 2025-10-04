import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProductCardSke = () => {
  return (
    <Card className="overflow-hidden shadow-none h-fit p-6 gap-3 relative">
      <Skeleton className="absolute top-2 right-2 w-6 h-6 rounded-full" />
      <Skeleton className="w-40 h-40 mx-auto rounded-xl bg-gray-300 animate-pulse" />

      <div className="flex flex-col gap-1 sm:gap-2 mt-2">
        <Skeleton className="w-20 h-3 rounded-full bg-gray-200 animate-pulse" />{" "}
        <Skeleton className="w-32 h-4 rounded-full bg-gray-300 animate-pulse" />{" "}
      </div>

      <div className="flex items-center gap-2 mt-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
          />
        ))}
        <Skeleton className="w-12 h-3 rounded-full bg-gray-200 animate-pulse" />{" "}
      </div>

      <div className="flex justify-between items-center mt-2 gap-2">
        <Skeleton className="w-12 h-5 rounded-full bg-gray-300 animate-pulse" />{" "}
        <Skeleton className="w-20 h-8 rounded-lg bg-gray-300 animate-pulse" />{" "}
      </div>
    </Card>
  );
};
export default ProductCardSke;
