import ProductCard from "@/components/app/common/ProductCard";
import ProductCardSke from "@/components/skeletons/ProductCardSke";
import axiosInstance from "@/lib/axios/axios";
import { showErrorToast } from "@/lib/utils";
import { updateCart } from "@/store/slices/cartSlice";
import type { AppDispatch, RootState } from "@/store/store";
import type { CartItemsType, ErrorToastType, ProductType } from "@/types/types";
import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type RelatedProductsPropsTypes = {
  category: string;
  id: string;
};

const RelatedProducts: React.FC<RelatedProductsPropsTypes> = (props) => {
  const { category, id } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getSimilarProducts = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/emart/products/smilar-products`,
        {
          signal,
          params: {
            category,
            id,
          },
        }
      );
      switch (data.status) {
        case "FETCHED":
          setProducts(data.products);
          setLoaded(Array(data.products.length).fill(false));
          setLoading(false);
          break;
        default:
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getSimilarProducts(controller.signal);
    return () => {
      controller.abort();
    };
  }, [id, navigate]);

  const navProduct = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const notAllowedIds = ["save", "addCart", "addQuantity", "removeQuantity"];
    const idEle = (e.target as HTMLElement).id;

    if (notAllowedIds.includes(idEle)) {
      return null;
    }
    navigate(`/product/${id}`);
  };

  const handleLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
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
      default:
        break;
    }
  };

  return (
    <div className="overflow-auto space-y-4 w-full">
      <h2 className="text-xl font-bold">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-4 w-full">
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
    </div>
  );
};
export default RelatedProducts;
