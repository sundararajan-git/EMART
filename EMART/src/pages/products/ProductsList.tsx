"use client";
import FilterProducts from "./components/FilterProducts";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axios";
import { useLocation, useNavigate } from "react-router-dom";
import type { ErrorToastType, ProductType } from "@/types/types";
import { showErrorToast } from "@/lib/utils";
import ProductCardSke from "@/components/skeletons/ProductCardSke";
import ProductCard from "@/components/app/common/ProductCard";

function useQuery() {
  return new URLSearchParams(useLocation().search).get("q");
}

const ProductsList = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loaded, setLoaded] = useState<boolean[]>([]);

  const getProducts = async () => {
    try {
      const { data } = await axiosInstance.get(`/emart/search?q=${query}`);
      switch (data.status) {
        case "FETCHED":
          setProducts(data.products);
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  const handleLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const navProduct = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const notAllowedIds = ["save", "addCart", "addQuantity", "removeQuantity"];
    const idEle = (e.target as HTMLElement).id;

    if (notAllowedIds.includes(idEle)) {
      return null;
    }
    navigate(`/product/${id}`);
  };

  const addCartHandler = (type: string) => {
    switch (type) {
      case "ADD":
        console.log("Added");
        break;
      case "INC":
        console.log("Inc");
        break;
      case "DEC":
        console.log("Dec");
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 px-6 py-8">
      <div className="flex items-center justify-between">
        <p className="text-sm">Home / Products </p>
        <FilterProducts />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {products.length ? (
          products.map((p, index) => (
            <div key={index} onClick={(e) => navProduct(p._id, e)}>
              {!loaded[index] && <ProductCardSke />}
              <ProductCard
                product={p}
                index={index}
                loaded={loaded}
                handleLoad={handleLoad}
                addCartHandler={addCartHandler}
              />
            </div>
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
