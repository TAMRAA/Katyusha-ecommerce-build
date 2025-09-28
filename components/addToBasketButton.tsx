"use client";

import useBasketStore from "@/app/(store)/store/store";
import { Product } from "@/sanity.types";
import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, Sparkles } from "lucide-react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function AddToBasketButton({
  product,
  disabled,
  className,
  children,
}: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAdd = () => {
    addItem(product);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleRemove = () => {
    removeItem(product._id);
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-2xl"></div>
      </div>
    );
  }

  // If it's disabled and no items in cart, show simple disabled button
  if (disabled && itemCount === 0) {
    return (
      <button
        disabled
        className={`w-full py-4 px-8 text-lg font-semibold rounded-2xl bg-gray-300 text-gray-500 cursor-not-allowed transition-all duration-300 ${className}`}
      >
        <span className="flex items-center justify-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <span>Out of Stock</span>
        </span>
      </button>
    );
  }

  // If there are items in cart, show the quantity selector
  if (itemCount > 0) {
    return (
      <div className="flex items-center justify-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-orange-200 shadow-lg">
        <button
          onClick={handleRemove}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
            itemCount === 0
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 shadow-md"
          }`}
          disabled={itemCount === 0 || disabled}
          aria-label={`Remove ${product.name || "item"} from basket`}
        >
          <Minus
            className={`w-5 h-5 ${itemCount === 0 ? "text-gray-400" : "text-red-600"}`}
          />
        </button>

        <div className="flex flex-col items-center space-y-1">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {itemCount}
          </span>
          <span className="text-xs text-gray-500 font-medium">in basket</span>
        </div>

        <button
          onClick={handleAdd}
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          disabled={disabled}
          aria-label={`Add ${product.name || "item"} to basket`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // If no items in cart and not disabled, show add to basket button
  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`relative overflow-hidden py-4 px-8 text-lg font-semibold rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
      aria-label={`Add ${product.name || "item"} to basket`}
    >
      {/* Animated sparkle effect */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute w-4 h-4 text-yellow-300 animate-ping"
              style={{
                left: `${20 + i * 30}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Button content */}
      <span className="flex items-center justify-center space-x-2 relative z-10">
        <ShoppingCart className="w-5 h-5" />
        {children || <span>Add to Basket</span>}
        <Sparkles className="w-4 h-4" />
      </span>

      {/* Ripple effect */}
      <span className="absolute inset-0 overflow-hidden rounded-2xl">
        <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 translate-y-full hover:translate-y-0 transition-transform duration-300" />
      </span>
    </button>
  );
}

export default AddToBasketButton;