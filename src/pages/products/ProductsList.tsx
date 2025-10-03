"use client";
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
import FilterProducts from "./components/FilterProducts";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search).get("q");
}

const ProductsList = () => {
  const query = useQuery();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [query]);

  const getProducts = async () => {
    try {
      const { data } = await axiosInstance.get(`/emart/search?q=${query}`);
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
    <div className="w-full flex flex-col gap-4 px-6 py-8">
      <div className="flex items-center justify-between">
        <p className="text-sm">Home / Products </p>
        <FilterProducts />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {true ? (
          products.map((pro, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-none h-fit  p-4 gap-3 relative group"
            >
              <Button
                className="rounded-sm font-medium cursor-pointer absolute top-2 right-2 hidden group-hover:block "
                variant="ghost"
              >
                <IoBookmarkOutline className="fill-green-800 size-5" />
              </Button>
              <CardHeader className="p-0 hover:cursor-pointer">
                <img
                  src={pro.images[0]}
                  alt="img"
                  loading="eager"
                  className="w-30 h-30  sm:w-50 sm:h-50 mx-auto object-contain rounded-xl"
                />
              </CardHeader>
              <CardContent className="flex items-center justify-between p-0 hover:cursor-pointer">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    {pro.category}
                  </p>
                  <h3 className="text-base font-semibold line-clamp-1">
                    {pro.name}
                  </h3>
                  <div className="hidden sm:flex flex-warp items-start sm:items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={20}
                        className={
                          index + 1 < parseInt(pro.rating)
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
              <CardFooter className="flex flex-warp justify-start sm:justify-between gap-2 w-full p-0">
                <div className="inline-flex flex-wrap items-center gap-2">
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
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found for "XYZ"
          </p>
        )}
      </div>
    </div>
  );
};
export default ProductsList;
