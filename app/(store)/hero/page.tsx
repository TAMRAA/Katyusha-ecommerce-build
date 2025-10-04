"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/landing.png",
    title: "JOIN THE SQUAD",
    subtitle: "For an optimized performance",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative h-[75vh] w-full overflow-hidden mt-6 rounded-3xl">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={
              index === currentSlide
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.05 }
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <motion.img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={index === currentSlide ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
          </motion.div>
        ))}
      </div>

      {/* Content at bottom */}
      <div className="absolute inset-x-0 bottom-12 flex flex-col items-center text-center text-white px-6 space-y-4">

        {/* Small Title */}
        <AnimatePresence mode="wait">
          <motion.p
            key={slides[currentSlide].id + "-subtitle"}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-extrabold text-md md:text-md drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)]"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
        </AnimatePresence>

        {/* Big Title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={slides[currentSlide].id + "-title"}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-black text-3xl md:text-5xl uppercase drop-shadow-[0_8px_25px_rgba(0,0,0,1)]"
          >
            {slides[currentSlide].title}
          </motion.h1>
        </AnimatePresence>

        {/* Buttons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id + "-button"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Button
              size="icon"
              className="bg-white text-black font-black px-12 py-5 rounded-lg shadow-lg hover:bg-orange-600 hover:text-white hover:scale-105 transition-transform uppercase"
              asChild
            >
              <a href={slides[currentSlide].buttonLink}>
                {slides[currentSlide].buttonText}
              </a>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors shadow-lg"
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors shadow-lg"
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full border-2 border-white transition-all ${
              index === currentSlide
                ? "bg-orange-500 scale-125 shadow-[0_0_10px_rgba(0,0,0,1)]"
                : "bg-transparent hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
