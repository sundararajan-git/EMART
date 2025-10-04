import React from "react";
import { Star } from "lucide-react";

const ratingData = {
  average: 4.5,
  totalReviews: 120,
  breakdown: [
    { stars: 5, count: 70 },
    { stars: 4, count: 30 },
    { stars: 3, count: 10 },
    { stars: 2, count: 5 },
    { stars: 1, count: 5 },
  ],
};

const RatingBreakdown = ({ rating }) => {
  const maxCount = Math.max(...ratingData.breakdown.map((b) => b.count));
  return (
    <div className="w-full p-4 border rounded-md shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold">
          {ratingData.average.toFixed(1)}
        </span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={
                i + 1 < rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
        <span className="text-gray-600 ml-2">
          ({ratingData.totalReviews} reviews)
        </span>
      </div>

      <div className="space-y-2">
        {ratingData.breakdown.map((item) => {
          const widthPercent = (item.count / maxCount) * 100;
          return (
            <div key={item.stars} className="flex items-center gap-2">
              <span className="w-6 text-sm">{item.stars}★</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-xs overflow-hidden">
                <div
                  className="h-2 bg-yellow-500"
                  style={{ width: `${widthPercent}%` }}
                ></div>
              </div>
              <span className="w-6 text-sm text-gray-600">{item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingBreakdown;
