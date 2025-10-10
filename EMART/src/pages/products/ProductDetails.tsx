import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useLocation } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { showErrorToast } from "@/lib/utils";
import type { CartItemsType, ErrorToastType, ProductType } from "@/types/types";
import axiosInstance from "@/lib/axios/axios";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaRegStar, FaSpinner, FaStar, FaStarHalf } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { ProductDetailsColumns } from "./components/ProductDetailsColumns";
import { ProductReviews } from "./components/ProductReviews";
import RelatedProducts from "./components/RelatedProducts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { updateCart } from "@/store/slices/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) => state.cart);
  const { isVerified } = useSelector((state: RootState) => state.user);
  const [product, setProduct] = useState<ProductType>({} as ProductType);
  const [loading, setIsloading] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const getProduct = async (signal: AbortSignal) => {
    try {
      setIsloading(true);
      const { data } = await axiosInstance.get(`/emart/product/${id}`, {
        signal,
      });
      switch (data.status) {
        case "FETCHED":
          setProduct(data.product);
          setIsloading(false);
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
    getProduct(controller.signal);
    return () => {
      controller.abort();
    };
  }, [id]);

  const handleAddToCart = async () => {
    if (!isVerified) {
      toast("Please login", {
        icon: "🙏",
      });
      return;
    }

    if (product?.quantity) {
      toast("Already Added", {
        icon: "🙏",
      });
      return;
    }
    try {
      const { data } = await axiosInstance.put("/emart/add-to-cart", {
        productId: id,
        quantity: 1,
      });
      toast.success(data.message);
      switch (data.status) {
        case "UPDATED":
          const cartItem = data.cart?.items.find(
            (i: CartItemsType) => i.product === id
          );
          setProduct((prev: ProductType) => {
            return { ...prev, quantity: cartItem.quantity, inCart: true };
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

  const qtyChangeHandler = async (type: string) => {
    if (!isVerified) {
      toast("Please login", {
        icon: "🙏",
      });
      return;
    }
    if (type === "INC" && !product.quantity) {
      toast("Please add to cart", {
        icon: "🙏",
      });
      return;
    }
    try {
      const { data } = await axiosInstance.put("/emart/up-quantity", {
        productId: id,
        action: type,
      });

      if (data.message) {
        toast.success(data.message);
      }
      switch (data.status) {
        case "UPDATED":
          const cartItem = data.cart?.items.find(
            (i: CartItemsType) => i.product === id
          );
          setProduct((prev: ProductType) => {
            return {
              ...prev,
              quantity: cartItem?.quantity ?? 0,
              inCart: cartItem?.quantity ? true : false,
            };
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

  if (loading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center w-full h-[90vh]">
        <FaSpinner className="text-primary size-6 animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="inline-flex">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/search?q=${encodeURIComponent(product.category)}`}
              >
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible">
            {product?.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product?.name} thumbnail ${i + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  i === selected ? "border-blue-500" : "border-gray-200"
                }`}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>

          <div className="flex-1 flex justify-center items-center">
            <img
              src={product?.images[selected]}
              alt={`${product?.name} main`}
              className="w-full max-w-md h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-semibold py-1">{product?.name}</h1>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-400 mt-2 inline-flex items-center gap-1">
            <BsCurrencyRupee />
            {product.discountPrice.toFixed(2)}
            <span className="line-through text-sm text-muted-foreground ml-2">
              {product.price}
            </span>
          </p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              if (product.rating >= starValue) {
                return (
                  <FaStar key={index} size={20} className="text-yellow-500" />
                );
              } else if (product.rating >= starValue - 0.5) {
                return (
                  <span key={index} className="relative inline-block">
                    <FaRegStar size={20} className="text-gray-300" />
                    <FaStarHalf
                      size={20}
                      className="text-yellow-500 absolute top-0 left-0"
                    />
                  </span>
                );
              } else {
                return (
                  <FaRegStar key={index} size={20} className="text-gray-300" />
                );
              }
            })}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-500">
              ({product.totalReviews} reviews)
            </span>
          </div>

          <div className="mt-6 flex flex-col  gap-4">
            <label className="text-sm font-medium text-muted-foreground">
              Quantity ( {product.unit} )
            </label>
            <div className="flex items-center">
              <Button
                onClick={() => qtyChangeHandler("DEC")}
                className="size-8 bg-gray-100 hover:bg-gray-200 rounded-sm cursor-pointer"
                variant="outline"
                disabled={(product?.quantity ?? 0) <= 1}
              >
                <FiMinus />
              </Button>
              <span className="px-4 py-1 text-center w-12">
                {product?.quantity || 1}
              </span>
              <Button
                onClick={() => qtyChangeHandler("INC")}
                className="size-8 rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer"
                variant="outline"
                // disabled={(product?.quantity ?? 0) < 1}
              >
                <FiPlus />
              </Button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button
              onClick={handleAddToCart}
              className="w-fit flex items-center justify-center gap-2 rounded-sm cursor-pointer text-black"
              variant="default"
            >
              {!product?.quantity ? <span>Add to Cart</span> : "Added"}
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <p>Category</p>
            <p className="text-gray-700 dark:text-gray-500">
              {product?.category}
            </p>
            <p>Description</p>
            <p className="text-gray-700 dark:text-gray-500">
              {product?.description}
            </p>
          </div>
        </div>

        <div className="w-full">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-transparent gap-4">
              <TabsTrigger
                value="details"
                className="dark:data-[state=active]:border-x-0 dark:data-[state=active]:border-t-0 dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-primary cursor-pointer rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:shadow-none data-[state=active] bg-transparent"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="dark:data-[state=active]:border-x-0 dark:data-[state=active]:border-t-0 dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-primary cursor-pointer rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:shadow-none data-[state=active] bg-transparent"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ProductDetailsColumns />
            </TabsContent>
            <TabsContent value="reviews">
              <ProductReviews product={product} />
            </TabsContent>
          </Tabs>
        </div>
        <RelatedProducts category={product.category} id={id as string} />
      </div>
    </div>
  );
};

export default ProductPage;
