"use client";

import useBasketStore from "@/app/(store)/store/store";
import { Product } from "@/sanity.types";
import { useState, useEffect } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {isClient && (
        <>
          <button
            onClick={() => removeItem(product._id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              itemCount === 0
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={itemCount === 0 || disabled}
            aria-label={`Remove ${product.name || "item"} from basket`}
          >
            <span
              className={`text-xl font-bold leading-none ${
                itemCount === 0 ? "text-gray-400" : "text-gray-600"
              }`}
              style={{
                lineHeight: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              -
            </span>
          </button>
          <span className="w-8 text-center font-semibold">{itemCount}</span>
          <button
            onClick={() => addItem(product)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-900 text-white hover:bg-orange-500 transition-colors duration-200"
            disabled={disabled || false}
            aria-label={`Add ${product.name || "item"} to basket`}
          >
            <span
              className="text-xl font-bold leading-none"
              style={{
                lineHeight: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              +
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export default AddToBasketButton;
