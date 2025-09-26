"use client";
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-6">
        {products?.map((product) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0.2, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <ProductThumb product={product} />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

export default ProductGrid;