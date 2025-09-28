"use client";

import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-md font-semibold text-gray-900 mb-3">
            {products.length} product
            {products.length !== 1 ? "s" : ""}
          </h1>
          <p className="text-gray-600 text-lg"></p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar - Always visible, collapses naturally on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-24">
              <h2 className="font-semibold text-xl text-gray-900 mb-4">
                Categories
              </h2>
              <CategorySelectorComponent categories={categories} />
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <ProductGrid products={products} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
