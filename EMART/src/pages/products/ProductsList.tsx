"use client";
import FilterProducts from "./components/FilterProducts";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios/axios";
import { useLocation, useNavigate } from "react-router-dom";
import type { CartItemsType, ErrorToastType, ProductType } from "@/types/types";
import { showErrorToast } from "@/lib/utils";
import ProductCardSke from "@/components/skeletons/ProductCardSke";
import ProductCard from "@/components/app/common/ProductCard";
import { FaSpinner } from "react-icons/fa6";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@/store/slices/cartSlice";

function useQuery() {
  return new URLSearchParams(useLocation().search).get("q");
}

const ProductsList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useQuery();
  const dispatch = useDispatch<AppDispatch>();
  const cartCount = useSelector((state: RootState) => state.cart);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const getProducts = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/emart/search?q=${query}`, {
        signal,
        params: {
          page: currentPage,
          limit: 10,
        },
      });

      switch (data.status) {
        case "FETCHED":
          setProducts(data.products);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
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
  }, [query, currentPage]);

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
          console.log(cartCount + 1);
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
    <div className="w-full h-full flex flex-col gap-4 px-6 pt-4 pb-8">
      <div className="flex items-center justify-between ">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{query}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <FilterProducts />
      </div>
      {loading ? (
        <div className="flex flex-col gap-2 items-center justify-center h-[80vh]">
          <FaSpinner className="text-primary size-6 animate-spin" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
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

          {totalPages > 1 ? (
            <Pagination className="flex justify-end w-full mt-6">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                )}

                {currentPage > 3 && (
                  <>
                    <PaginationItem onClick={() => setCurrentPage(1)}>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    {currentPage > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {[...Array(totalPages)].map((_, index) => {
                  if (index + 2 >= currentPage && currentPage >= index - 1) {
                    return (
                      <PaginationItem
                        key={index}
                        className={`border rounded-sm ${
                          index + 1 === currentPage
                            ? "bg-primary text-black"
                            : ""
                        } `}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        <PaginationLink href="#">{index + 1}</PaginationLink>
                      </PaginationItem>
                    );
                  } else {
                    null;
                  }
                })}

                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem onClick={() => setCurrentPage(totalPages)}>
                      <PaginationLink href="#">{totalPages}</PaginationLink>
                    </PaginationItem>
                  </>
                )}

                {totalPages > 1 && currentPage < totalPages ? (
                  <PaginationItem
                    className="items-center"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <PaginationNext href="#" />
                  </PaginationItem>
                ) : null}
              </PaginationContent>
            </Pagination>
          ) : null}
        </>
      )}
    </div>
  );
};
export default ProductsList;
