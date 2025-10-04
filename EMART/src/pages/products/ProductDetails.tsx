import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useLocation } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import RatingBreakdown from "./components/RatingBreakdown";
import { showErrorToast } from "@/lib/utils";
import type { ErrorToastType, ProductType } from "@/types/types";
import axiosInstance from "@/lib/axios/axios";
import { BsCurrencyRupee } from "react-icons/bs";

const ProductPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [product, setProduct] = useState<ProductType>({} as ProductType);
  const [loading, setIsloading] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const getProduct = async () => {
    try {
      setIsloading(true);
      console.log(id);
      const { data } = await axiosInstance.get(`/emart/product/${id}`);
      console.log(data);
      switch (data.status) {
        case "FETCHED":
          setProduct(data.product);
          break;
        default:
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCart = () => {
    // setProducts((prev) => {
    //   const clone = prev.map((p) => {
    //     if (p.id === id) {
    //       return { ...p, isCart: true };
    //     } else {
    //       return p;
    //     }
    //   });
    //   return clone;
    // });
    toast.success("Added Successfully");
  };

  const qtyChangeHandler = (type: string) => {
    // setProducts((prev) => {
    //   const clone = prev.map((p) => {
    //     if (p.id === parseInt(id)) {
    //       if (type === "INC") {
    //         return { ...p, quantity: Math.max(p.quantity + 1, 1) };
    //       } else if (type === "DEC") {
    //         return { ...p, quantity: Math.max(p.quantity - 1, 1) };
    //       }
    //     } else {
    //       return p;
    //     }
    //   });
    //   return clone;
    // });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="inline-flex">
        <p>Home / {product.name}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
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

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={product?.images[selected]}
              alt={`${product?.name} main`}
              className="w-full max-w-md h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl font-bold text-gray-800 dark:text-gray-400 mt-2 inline-flex items-center gap-1">
            <BsCurrencyRupee />
            {product.discountPrice.toFixed(2)}
            <p className="line-through text-xs text-muted-foreground ml-2">
              {product.price}
            </p>
          </p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                className={
                  index + 1 < product.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-500">
              ({product.totalReviews} reviews)
            </span>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-500">
            {product?.description}
          </p>

          <div className="mt-6 space-y-2">
            <p className="text-md">About</p>
            <ul className="flex flex-col gap-2 text-muted-foreground">
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>
                blanditiis omnis explicabo delectus quo veritatis quod nemo!
              </li>
              <li>
                blanditiis omnis explicabo delectus quo veritatis quod nemo!
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col  gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-500">
              Quantity
            </label>
            <div className="flex items-center">
              <Button
                onClick={() => qtyChangeHandler("DEC")}
                className="size-8 bg-gray-100 hover:bg-gray-200 rounded-sm cursor-pointer"
                variant="outline"
                // disabled={product?.quantity === 1}
              >
                <FiMinus />
              </Button>
              <span className="px-4 py-1 text-center w-12">
                {/* {product?.quantity} */}1
              </span>
              <Button
                onClick={() => qtyChangeHandler("INC")}
                className="size-8 rounded-sm bg-gray-100 hover:bg-gray-200 cursor-pointer"
                variant="outline"
              >
                <FiPlus />
              </Button>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Button
              onClick={handleAddToCart}
              className="w-fit flex items-center justify-center gap-2 rounded-sm cursor-pointer"
              variant={"secondary"}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </Button>
            <Button
              onClick={handleAddToCart}
              className="w-fit flex1 items-center justify-center gap-2 rounded-sm bg-primary text-black cursor-pointer hidden"
            >
              <RiMoneyDollarCircleLine size={20} />
              Buy Now
            </Button>
          </div>
        </div>
        <div>
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
              <ProductReviews />
            </TabsContent>
          </Tabs>
        </div>
        <div className="overflow-auto space-y-4">
          <h2 className="text-xl font-bold">Related Products</h2>
          {Array.from({ length: 10 }).map((i) => {
            return (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                harum ut dolore, porro magnam similique, et quasi ullam
                aspernatur vel deserunt voluptas tempora vero praesentium eum
                facilis minima quibusdam. Provident?
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

const productDetails = {
  description:
    "A classic pullover hoodie made from soft cotton blend. Perfect for casual wear, workouts, or lounging at home.",
  specifications: {
    Material: "80% Cotton, 20% Polyester",
    Sizes: "S, M, L, XL",
    Colors: "Black, Grey, Navy",
    Weight: "450g",
    Brand: "Brand A",
  },
  shipping: "Ships within 2-3 business days. Free returns within 30 days.",
  care: "Machine wash cold, tumble dry low, do not bleach.",
};

export function ProductDetailsColumns() {
  return (
    <div className="flex flex-col gap-6 mt-4 w-full">
      <div className="border rounded-md p-4 shadow-sm w-full">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{productDetails.description}</p>
      </div>

      <div className="border rounded-md p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Specifications</h3>
        <div className="flex flex-col gap-2 text-gray-700">
          {Object.entries(productDetails.specifications).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b py-1 last:border-none"
            >
              <span className="font-medium">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-md p-4 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping</h3>
          <p className="text-gray-700">{productDetails.shipping}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Care Instructions</h3>
          <p className="text-gray-700">{productDetails.care}</p>
        </div>
      </div>
    </div>
  );
}

const reviews = [
  {
    id: 1,
    name: "John Doe",
    avatar:
      "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759480502/reviewer1_hcjek3.png",
    rating: 5,
    comment: "Amazing hoodie! Fits perfectly and very comfortable.",
    date: "Sep 10, 2025",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar:
      "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759480503/reviewer2_yhza2x.png",
    rating: 4,
    comment: "Good quality, but the color is slightly different than shown.",
    date: "Sep 8, 2025",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar:
      "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759480508/reviewer3_zqlvff.png",
    rating: 5,
    comment: "Excellent hoodie! Warm and stylish.",
    date: "Sep 5, 2025",
  },
];

export function ProductReviews() {
  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <h2 className="text-xl font-bold">Customer Reviews</h2>
      <RatingBreakdown rating={4.5} />

      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex gap-4 p-4 border rounded-md shadow-sm"
        >
          {/* Avatar */}
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          {/* Review Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{review.name}</h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            {/* Stars */}
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* Comment */}
            <p className="mt-2 text-gray-700">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
