"use client";

import useBasketStore from "@/app/(store)/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AddToBasketButton from "@/components/addToBasketButton";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import {
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Truck,
  Shield,
} from "lucide-react";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (groupedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 border border-gray-200">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Basket</h1>
          <p className="text-gray-600 text-lg mb-8">
            Your shopping basket is waiting to be filled with amazing products!
          </p>
          <button
            onClick={() => router.push("/categories")}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  const totalItems = groupedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = useBasketStore.getState().getTotalPrice();

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-200/10 to-red-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-amber-200/10 to-yellow-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
            Your Basket
          </h1>
          <p className="text-gray-600 text-lg">
            {totalItems} item{totalItems !== 1 ? "s" : ""} • Total: $
            {totalPrice.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Basket Items */}
          <div className="flex-grow space-y-4">
            {groupedItems.map((item, index) => (
              <div
                key={item.product._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div
                      className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group-hover:shadow-md transition-shadow"
                      onClick={() =>
                        router.push(`/product/${item.product.slug?.current}`)
                      }
                    >
                      {item.product.image && (
                        <Image
                          src={imageUrl(item.product.image).url()}
                          alt={item.product.name ?? "Product image"}
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          fill
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>

                    {/* Product Info */}
                    <div
                      className="flex-grow min-w-0 cursor-pointer"
                      onClick={() =>
                        router.push(`/product/${item.product.slug?.current}`)
                      }
                    >
                      <h2 className="text-xl font-semibold text-gray-900 truncate mb-2 group-hover:text-orange-600 transition-colors">
                        {item.product.name}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          ${(item.product.price ?? 0).toFixed(2)} each
                        </span>
                        <span>•</span>
                        <span className="font-medium text-gray-900">
                          $
                          {((item.product.price ?? 0) * item.quantity).toFixed(
                            2
                          )}{" "}
                          total
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex-shrink-0">
                      <AddToBasketButton product={item.product} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Sticky on desktop, fixed on mobile */}
          <div className="w-full lg:w-96">
            <div className="lg:sticky lg:top-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Order Summary
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-semibold text-gray-900">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between items-center text-2xl font-bold border-t border-gray-200 pt-4">
                  <span className="text-gray-900">Total:</span>
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                {isSignedIn ? (
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                ) : (
                  <SignInButton mode="modal">
                    <button className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Sign in to Checkout
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile spacer */}
      <div className="h-32 lg:h-0" />
    </div>
  );
}

export default BasketPage;
