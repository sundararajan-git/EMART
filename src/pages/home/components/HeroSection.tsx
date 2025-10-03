"use client";
import { useState, useEffect } from "react";

const heroImages = [
  "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759461245/hero1_jnoszf.webp",
  "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759461217/hero2_nbenmj.jpg",
  "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759461222/hero3_pu0v8o.jpg",
  "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759461217/hero2_nbenmj.jpg",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[60vh] relative overflow-hidden rounded-lg">
      {heroImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slide-${index}`}
          loading="eager"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity brightness-65 duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/90 to-transparent rounded-b-lg" />
    </div>
  );
};

export default HeroSection;
