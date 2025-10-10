import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axios";
import ProductCardSke from "@/components/skeletons/ProductCardSke";
import { useNavigate } from "react-router-dom";
import type { CartItemsType, ErrorToastType, ProductType } from "@/types/types";
import { showErrorToast } from "@/lib/utils";
import ProductCard from "@/components/app/common/ProductCard";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@/store/slices/cartSlice";

const TopOffers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) => state.cart);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/emart/top-offers", { signal });
      console.log(data.products);
      switch (data.status) {
        case "FETCHED":
          setProducts(data.products);
          setLoaded(Array(data.products.length).fill(false));
          setLoading(false);
          break;
        default:
          console.warn("Unhandled status:", data.status);
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

  const addtoCart = async (_id: string) => {
    try {
      const { data } = await axiosInstance.put("/emart/add-to-cart", {
        productId: _id,
        quantity: 1,
      });
      toast.success(data.message);
      switch (data.status) {
        case "UPDATED":
          const cartItem = data.cart?.items.find(
            (i: CartItemsType) => i.product === _id
          );
          setProducts((prev: ProductType[]) => {
            return prev.map((i: ProductType) => {
              if (i._id === _id && cartItem) {
                return { ...i, quantity: cartItem.quantity, inCart: true };
              }
              return i;
            });
          });
          dispatch(updateCart({ value: cartCount + 1 }));
          break;
        default:
          console.warn("Unhandled status:", data.status);
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  const upQuantity = async (type: string, _id: string) => {
    try {
      const { data } = await axiosInstance.put("/emart/up-quantity", {
        productId: _id,
        action: type,
      });

      if (data.message) {
        toast.success(data.message);
      }
      switch (data.status) {
        case "UPDATED":
          const cartItem = data.cart?.items.find(
            (i: CartItemsType) => i.product === _id
          );
          setProducts((prev: ProductType[]) => {
            return prev.map((i: ProductType) => {
              if (i._id === _id && cartItem) {
                return { ...i, quantity: cartItem.quantity, inCart: true };
              }
              return i;
            });
          });
          const count = type === "INC" ? cartCount + 1 : cartCount - 1;
          dispatch(updateCart({ value: count }));
          break;
        default:
          console.warn("Unhandled status:", data.status);
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  const addCartHandler = (type: string, _id: string) => {
    switch (type) {
      case "ADD":
        addtoCart(_id);
        break;
      case "INC":
        upQuantity("INC", _id);
        break;
      case "DEC":
        upQuantity("DEC", _id);
        break;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
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
    </div>
  );
};
export default TopOffers;
