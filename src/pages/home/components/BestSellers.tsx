import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoBookmarkOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axios";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/emart/best-sellers");
      console.log(data);
      switch (data.status) {
        case "FETCHED":
          setProducts(data.products);
          break;
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {products.map((p, index) => {
        return (
          <Card
            key={index}
            className="overflow-hidden shadow-none h-fit p-4 gap-3 relative group"
          >
            <Button
              className="rounded-sm font-medium cursor-pointer absolute top-2 right-2 hidden group-hover:block "
              variant="ghost"
            >
              <IoBookmarkOutline className="fill-green-800 size-5" />
            </Button>
            <CardHeader className="p-0 hover:cursor-pointer">
              <img
                src={p.images[0]}
                alt="img"
                className="w-40 mx-auto h-40 object-cover rounded-xl"
              />
            </CardHeader>
            <CardContent className="flex items-center justify-between p-0 hover:cursor-pointer">
              <div className="flex flex-col gap-1 sm:gap-2">
                <p className="text-sm text-muted-foreground">{p.category}</p>
                <h3 className="text-base font-semibold">{p.name}</h3>
                <div className="hidden sm:flex flex-wrap items-start sm:items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className={
                        index + 1 < 4.5
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-500">
                    (4 reviews)
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-start sm:justify-between gap-2 w-full p-0">
              <div className="inline-flex  flex-wrap items-center gap-2">
                <p className="text-xl font-bold">${129}</p>
                <p className="line-through text-xs text-muted-foreground">
                  $200
                </p>
              </div>
              {true ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    className="rounded-sm font-medium cursor-pointer "
                    variant="outline"
                    size="sm"
                  >
                    <LuMinus />
                  </Button>
                  <span>1</span>
                  <Button
                    className="rounded-sm font-medium cursor-pointer "
                    variant="outline"
                    size="sm"
                  >
                    <LuPlus />
                  </Button>
                </div>
              ) : (
                <Button className="hidden sm:flex rounded-sm font-medium cursor-pointer text-black">
                  Add
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
export default BestSellers;
