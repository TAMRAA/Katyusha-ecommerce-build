// components/BlackFridayBanner.tsx
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSale() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/sale/black-friday");
        // console.log("🔵 API Response status:", res.status);

        if (!res.ok) {
          console.log("🔴 API Error - Status not OK:", res.status);
          setError(`API returned ${res.status} ${res.statusText}`);
          return;
        }

        const data: Sale = await res.json();
        // console.log("🟢 Received sale data:", data);

        // Check if sale is active
        if (data.isActive) {
          console.log("✅ Sale is active, displaying banner");
          setSale(data);
        } else {
          console.log("❌ Sale data exists but is not active");
          setError("Sale exists but is not active");
        }
      } catch (err) {
        console.error("💥 Error fetching sale:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setIsLoading(false);
        console.log("⚪ Finished loading, isLoading set to false");
      }
    }

    fetchSale();
  }, []);

  // Debug render states
  console.log(
    "🎨 Render state - isLoading:",
    isLoading,
    "sale:",
    sale,
    "error:",
    error
  );

  if (isLoading) {
    console.log("⏳ Still loading, not rendering");
    return null;
  }

  if (error) {
    console.log("🚫 Error occurred:", error);
    return null;
  }

  if (!sale) {
    console.log("📭 No sale data available");
    return null;
  }

  console.log("🎉 Rendering banner with sale:", sale);

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
      <br />
    </AnimatePresence>
  );
}
