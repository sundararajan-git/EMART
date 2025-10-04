import { useEffect, useState } from "react";
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

  const getProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/emart/best-sellers");
      switch (data.status) {
        case "FETCHED":
          setProducts(data.products);
          setLoaded(Array(data.products.length).fill(false));
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  useEffect(() => {
    getProducts();
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
    </div>
  );
};
export default BestSellers;
