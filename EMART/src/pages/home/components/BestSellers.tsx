import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axios";
import ProductCardSke from "@/components/skeletons/ProductCardSke";
import type { ErrorToastType, ProductType } from "@/types/types";
import { showErrorToast } from "@/lib/utils";
import ProductCard from "@/components/app/common/ProductCard";
import { useNavigate } from "react-router-dom";

const BestSellers = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/emart/best-sellers", {
        signal,
      });
      switch (data.status) {
        case "FETCHED":
          setProducts(data.products);
          setLoaded(Array(data.products.length).fill(false));
          setLoading(false);
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getProducts(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      <>
        {loading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <React.Fragment key={index}>
                  <ProductCardSke />
                </React.Fragment>
              );
            })}
          </>
        ) : (
          <>
            {products.map((p, index) => {
              return (
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
              );
            })}
          </>
        )}
      </>
    </div>
  );
};
export default BestSellers;
