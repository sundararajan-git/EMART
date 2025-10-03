"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import axiosInstance from "@/lib/axios/axios";
import { useEffect, useRef, useState } from "react";
import CategoriesCardSke from "@/components/skeletons/CategoriesCardSke";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/emart/categories");
      switch (data.status) {
        case "FETCHED":
          setProducts(data.categories);
          setLoaded(Array(data.categories.length).fill(false));
          break;
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleLoad = (index) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <Carousel
      className="w-full p-2 overflow-x-auto"
      opts={{ loop: true }}
      plugins={[plugin.current]}
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="flex items-center gap-2 w-full">
        {products.map((item, index) => {
          return (
            <CarouselItem key={index} className="max-w-[200px] h-fit">
              <Card
                className={`border-0 bg-muted items-center px-6 py-4 gap-8 h-[250px] hover:cursor-pointer ${
                  loaded[index] ? "flex" : "hidden"
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={`slide-${index}`}
                  loading="eager"
                  onLoad={() => handleLoad(index)}
                  className="object-contain w-full"
                />
                <p className="line-clamp-2">{item.name}</p>
              </Card>
              {!loaded[index] && <CategoriesCardSke />}
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default Categories;
