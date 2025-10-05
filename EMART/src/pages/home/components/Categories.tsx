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
import type { CategoriesType, ErrorToastType } from "@/types/types";
import { showErrorToast } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { upQueries } from "@/store/slices/searchQueries";

const Categories = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  const getCategoriesList = async () => {
    try {
      const { data } = await axiosInstance.get("/emart/categories");
      switch (data.status) {
        case "FETCHED":
          setCategories(data.categories);
          setLoaded(Array(data.categories.length).fill(false));
          const cat = data.categories.map((i: CategoriesType) => i.name);
          dispath(upQueries({ value: cat }));
          break;
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const handleLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const categoryNavHandler = (cat: string) => {
    navigate(`/search?q=${encodeURIComponent(cat)}`);
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
        {categories.map((item, index) => {
          return (
            <CarouselItem key={index} className="max-w-[200px] h-fit">
              <Card
                className={`border-0 bg-muted items-center px-6 py-4 gap-8 h-[250px] hover:cursor-pointer ${
                  loaded[index] ? "flex" : "hidden"
                }`}
                onClick={() => categoryNavHandler(item.name)}
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
