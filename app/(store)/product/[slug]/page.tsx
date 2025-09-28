import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import AddToBasketButton from "@/components/addToBasketButton";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { Star, Truck, Shield, RotateCcw, Zap, Sparkles } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 3600;

async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> Rendered the product page cache for ${slug}`
  );

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;
  const isLowStock =
    product.stock != null && product.stock > 0 && product.stock <= 10;

  // Mock reviews data
  const reviews = {
    average: 4.5,
    totalCount: 128,
    features: [
      "Premium Quality",
      "Fast Shipping",
      "Eco-Friendly",
      "1 Year Warranty",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-orange-500 transition-colors">
            Home
          </a>
          <span>›</span>
          <a
            href="/categories"
            className="hover:text-orange-500 transition-colors"
          >
            Products
          </a>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Product Image Section */}
          <div className="space-y-6">
            <div
              className={`relative aspect-square overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ${
                isOutOfStock ? "opacity-60 grayscale" : "hover:shadow-3xl"
              }`}
            >
              {product.image && (
                <Image
                  src={imageUrl(product.image).url()}
                  alt={product.name ?? "Product image"}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
              )}

              {/* Stock Status Badge */}
              {isOutOfStock ? (
                <div className="absolute top-6 left-6">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    Out of Stock
                  </span>
                </div>
              ) : isLowStock ? (
                <div className="absolute top-6 left-6">
                  <span className="bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    Low Stock • {product.stock} left
                  </span>
                </div>
              ) : (
                <div className="absolute top-6 left-6">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    In Stock
                  </span>
                </div>
              )}

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Image Gallery Placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {product.name}
                </h1>
                <button className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-orange-200">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                </button>
              </div>

              {/* Reviews */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(reviews.average)
                          ? "fill-amber-400 text-amber-400"
                          : star === Math.ceil(reviews.average) &&
                              reviews.average % 1 !== 0
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-lg font-semibold text-gray-700 ml-2">
                    {reviews.average}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">
                  {reviews.totalCount} reviews
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-3">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ${product.price?.toFixed(2)}
                </span>
                <span className="text-lg text-green-600 font-semibold">
                  20% OFF
                </span>
              </div>
              <p className="text-gray-500 line-through">
                ${(product.price! * 1.25).toFixed(2)}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {reviews.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center space-x-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-orange-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                    {index === 0 && (
                      <Shield className="w-4 h-4 text-orange-600" />
                    )}
                    {index === 1 && (
                      <Truck className="w-4 h-4 text-orange-600" />
                    )}
                    {index === 2 && (
                      <Sparkles className="w-4 h-4 text-orange-600" />
                    )}
                    {index === 3 && (
                      <RotateCcw className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none space-y-4">
              <h3 className="text-xl font-bold text-gray-900">
                Product Details
              </h3>
              {Array.isArray(product.description) && (
                <div className="text-gray-700 leading-relaxed bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-orange-100">
                  <PortableText value={product.description} />
                </div>
              )}
            </div>

            {/* Add to Basket Section */}
            <div className="space-y-6 pt-4">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-white to-orange-50/30 border border-orange-200 shadow-lg">
                <AddToBasketButton
                  product={product}
                  disabled={isOutOfStock}
                  className="w-full py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isOutOfStock ? (
                    "Out of Stock"
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Add to Basket</span>
                      <Sparkles className="w-5 h-5" />
                    </span>
                  )}
                </AddToBasketButton>

                {!isOutOfStock && (
                  <p className="text-center text-sm text-gray-600 mt-3 flex items-center justify-center space-x-1">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping • Delivery in 2-3 days</span>
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-6 text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">30-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-orange-100 shadow-lg">
            <Truck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600">On all orders over $50</p>
          </div>

          <div className="text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-orange-100 shadow-lg">
            <RotateCcw className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day money back guarantee</p>
          </div>

          <div className="text-center p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-orange-100 shadow-lg">
            <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-600">Your data is always protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
