"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Sale {
  title: string;
  description: string;
  couponCode: string;
  discountAmount: number;
  isActive: boolean;
}

export default function BlackFridayBanner() {
  const [sale, setSale] = useState<Sale | null>(null);

  useEffect(() => {
    async function fetchSale() {
      try {
        const res = await fetch("/api/sale/black-friday");
        if (!res.ok) return; // handle 404 or server errors
        const data: Sale = await res.json();
        if (data.isActive) setSale(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSale();
  }, []);

  if (!sale) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="black-friday-banner"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-r from-black to-gray-900 text-white px-6 py-6 mx-4 mt-3 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex-1 mb-4 sm:mb-0">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-2">
              {sale.title}
            </h2>
            <p className="text-xl sm:text-3xl font-semibold">
              {sale.description}
            </p>
          </div>
          <div>
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md hover:scale-105 transform transition duration-300">
              <span className="font-bold text-base sm:text-xl">
                Use code:{" "}
                <span className="text-orange-500">{sale.couponCode}</span>
              </span>
              <span className="ml-2 font-bold text-base sm:text-xl">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
