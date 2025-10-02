"use client";
import { useState, useEffect } from "react";

const images = [
  "http://localhost:3000/hero1.webp",
  "http://localhost:3000/hero2.jpg",
  "http://localhost:3000/hero3.jpg",
  "http://localhost:3000/hero4.jpg",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[60vh] relative overflow-hidden rounded-lg">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slide-${index}`}
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
