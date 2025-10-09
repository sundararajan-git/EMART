import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { OrderSummaryDialog } from "./components/OrderSummaryDialog";
import { showErrorToast } from "@/lib/utils";
import type { CartItemsType, ErrorToastType, ProductType } from "@/types/types";
import axiosInstance from "@/lib/axios/axios";
import { BsCurrencyRupee } from "react-icons/bs";
import { LuMinus, LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { updateCart } from "@/store/slices/cartSlice";
import { FaSpinner } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) => state.cart);
  const [cart, setCart] = useState<CartItemsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const getCartproducts = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/emart/cart/products", {
        signal,
      });
      switch (data.status) {
        case "FETCHED":
          setCart(data.cartProducts);
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
    getCartproducts(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const handleRemove = async (id: string) => {
    try {
      const { data } = await axiosInstance.put(`/emart/cart/remove/${id}`);
      toast.success(data.message);
      switch (data.status) {
        case "REMOVED":
          const product = cart.find(
            (i) => (i.product as ProductType)._id === id
          );
          dispatch(updateCart({ value: cartCount - (product?.quantity ?? 0) }));
          setCart((prev) => {
            return prev.filter((i) => (i.product as ProductType)._id !== id);
          });
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc: number, item: any) =>
        acc + item.product.discountPrice * item.quantity,
      0
    );
  }, [cart]);

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
          setCart((prev: CartItemsType[]) => {
            return prev.map((i: CartItemsType) => {
              if ((i.product as ProductType)._id === _id && cartItem) {
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

  return (
    <div className="w-full min-h-screen max-h-full px-2 sm:px-8 h-full">
      <h1 className="text-2xl font-bold my-6">Shopping Cart</h1>
      {loading ? (
        <div className="flex flex-col gap-2 items-center justify-center w-full h-[50vh]">
          <FaSpinner className="text-primary size-6 animate-spin" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {cart.length ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cart.map((item: CartItemsType) => {
                  const product = item.product as ProductType;
                  return (
                    <Card
                      key={product._id}
                      className="flex flex-col flex-wrap items-center p-4 gap-4"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-32 w-32 object-cover rounded-md"
                      />

                      <CardContent className="flex-1 w-full p-0">
                        <h2 className="text-xl font-semibold">
                          {product.name}
                        </h2>
                        <p className="text-muted-foreground text-sm pt-1">
                          {product.category}
                        </p>
                        <p className="text-xl font-bold text-gray-800 dark:text-gray-400 mt-2 inline-flex items-center gap-1">
                          <BsCurrencyRupee />
                          {product.discountPrice.toFixed(2)}
                          <span className="line-through text-sm text-muted-foreground ml-2">
                            {product.price}
                          </span>
                        </p>
                      </CardContent>

                      <CardFooter className="flex justify-between w-full p-0">
                        <div className="flex items-center gap-2 py-0.5">
                          <Button
                            className="rounded-sm font-medium cursor-pointer "
                            variant="outline"
                            id="removeQuantity"
                            size="sm"
                            onClick={() => {
                              upQuantity("DEC", product._id);
                            }}
                            disabled={item.quantity <= 1}
                          >
                            <LuMinus />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            className="rounded-sm font-medium cursor-pointer "
                            variant="outline"
                            id="addQuantity"
                            size="sm"
                            onClick={() => {
                              upQuantity("INC", product._id);
                            }}
                          >
                            <LuPlus />
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="bg-red-600 dark:bg-red-600 rounded-sm cursor-pointer"
                          onClick={() => handleRemove(product._id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap justify-end items-center gap-2">
                <div className="text-lg">
                  Subtotal : {"  "}$ {subtotal.toFixed(2)}
                </div>
                <OrderSummaryDialog cart={cart} />
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-xl text-center pt-[20vh]">
              Cart is Empty !
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
