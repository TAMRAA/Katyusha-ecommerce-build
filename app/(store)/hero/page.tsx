"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/urban-streetwear-fashion-model-wearing-trendy-clot.jpg",
    title: "New Street Collection",
    subtitle: "Discover the latest urban fashion trends",
    buttonText: "Shop Now",
    buttonLink: "/streetwear",
  },
  {
    id: 2,
    image: "/skateboard-shoes-and-gear-lifestyle-photography.jpg",
    title: "Skate Culture",
    subtitle: "Premium boards, shoes and accessories",
    buttonText: "Explore",
    buttonLink: "/skateboard",
  },
  {
    id: 3,
    image: "/winter-snowboard-gear-and-equipment-mountain-lifes.jpg",
    title: "Winter Ready",
    subtitle: "Snowboard gear for the season",
    buttonText: "Get Ready",
    buttonLink: "/snowboard",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-[70vh] w-full overflow-hidden mt-6 rounded-3xl">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          </div>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl drop-shadow-md">
            {slides[currentSlide].subtitle}
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 font-semibold px-10 py-4 rounded-2xl shadow-lg"
            asChild
          >
            <a href={slides[currentSlide].buttonLink}>
              {slides[currentSlide].buttonText}
            </a>
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20
             p-3 md:p-4 rounded-full bg-transparent backdrop-blur-sm
             hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20
             p-3 md:p-4 rounded-full bg-transparent backdrop-blur-sm
             hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
