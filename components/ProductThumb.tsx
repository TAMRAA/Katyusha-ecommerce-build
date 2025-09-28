import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  // Safely extract description text
  const descriptionText =
    product.description
      ?.map((block) =>
        block._type === "block"
          ? block.children?.map((child: any) => child.text).join("")
          : ""
      )
      .join(" ")
      .trim() || "No description available";

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group block bg-white rounded-lg border border-gray-200
      shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full ${
        isOutOfStock ? "opacity-60 grayscale" : "hover:scale-105"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {product.image && (
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-bold text-lg bg-black bg-opacity-70 px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2 flex-1 mb-3">
          {descriptionText}
        </p>
        <p className="text-xl font-bold text-gray-900 mt-auto">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default ProductThumb;
