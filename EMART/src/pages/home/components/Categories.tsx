"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const Categories = () => {
  const [products, setProducts] = React.useState([]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  React.useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Handle the data as needed
      setProducts(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
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
        {products.map((item, index) => (
          <CarouselItem key={index} className="max-w-[200px] h-fit">
            <Card className="border-0 bg-muted items-center px-6 py-4 gap-8 h-[250px] hover:cursor-pointer">
              <img
                src={item.image}
                alt={`slide-${index}`}
                className="object-contain w-full"
              />
              <p className="line-clamp-2">{item.name}</p>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      className="w-full p-2"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="w-[300px]">
            <div className="w-full h-[60vh] relative">
              <img
                src={src}
                alt={`slide-${index}`}
                className="w-full h-full object-cover absolute brightness-75 rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Categories;
