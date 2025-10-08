import { Star } from "lucide-react";
import RatingBreakdown from "./RatingBreakdown";
import type { ProductType } from "@/types/types";

type ProductReviewsPropsType = {
  product: ProductType;
};

export const ProductReviews: React.FC<ProductReviewsPropsType> = (props) => {
  const { product } = props;
  return (
    <div className="min-w-full mt-8 space-y-6">
      <h2 className="text-xl font-bold ">Customer Reviews</h2>
      <RatingBreakdown rating={product.rating} />
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex gap-4 p-4 border rounded-md shadow-sm w-full"
        >
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{review.name}</h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

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

            <p className="mt-2 text-gray-700">{review.comment}</p>
          </div>
        </div>
      ))}
      <p className="invisible">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis,
        obcaecati voluptatem porro modi incidunt minus vero. Iste dolores
        tempora dolor explicabo corporis saepe, culpa, placeat laudantium
        perspiciatis porro, excepturi recusandae!
      </p>
    </div>
  );
};

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
