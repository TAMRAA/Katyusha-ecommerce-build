"use server";
import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Package,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

async function Orders() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-200/10 to-teal-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 border border-gray-100">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Orders
          </h1>
          <p className="text-gray-600 text-lg">
            {orders.length === 0
              ? "Your order history will appear here"
              : `You have ${orders.length} order${orders.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Orders Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              When you place orders, they will appear here with all the details
              you need to track your purchases.
            </p>
            <a
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.orderNumber}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Order Number
                        </p>
                        <p className="font-mono text-lg font-bold text-gray-900">
                          #{order.orderNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Date
                          </p>
                          <p className="font-medium text-gray-900">
                            {order.orderDate
                              ? new Date(order.orderDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status || "pending")}
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Status
                          </p>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status || "pending")}`}
                          >
                            {getStatusIcon(order.status || "pending")}
                            {order.status
                              ? order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  {/* Discount Banner */}
                  {order.amountDiscount && order.amountDiscount > 0 && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">
                              $
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              You saved
                            </p>
                            <p className="text-lg font-bold text-green-900">
                              {formatCurrency(
                                order.amountDiscount,
                                order.currency
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-600 line-through">
                            {formatCurrency(
                              (order.totalPrice ?? 0) + order.amountDiscount,
                              order.currency
                            )}
                          </p>
                          <p className="text-lg font-bold text-green-900">
                            {formatCurrency(
                              order.totalPrice ?? 0,
                              order.currency
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Order Items
                    </h3>

                    <div className="space-y-4">
                      {order.products?.map((product) => (
                        <div
                          key={product._key}
                          className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors group/item"
                        >
                          <div className="flex items-center gap-4">
                            {product.product?.image && (
                              <div className="relative h-16 w-16 rounded-xl overflow-hidden shadow-sm group-hover/item:shadow-md transition-shadow">
                                <Image
                                  src={imageUrl(product.product.image).url()}
                                  alt={product.product?.name ?? ""}
                                  className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                                  fill
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-900">
                                {product.product?.name ?? "Unknown Product"}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                Quantity: {product.quantity ?? "N/A"}
                              </p>
                              {product.product?.price && (
                                <p className="text-sm text-gray-500">
                                  {formatCurrency(
                                    product.product.price,
                                    order.currency
                                  )}{" "}
                                  each
                                </p>
                              )}
                            </div>
                          </div>

                          <p className="font-bold text-lg text-gray-900">
                            {product.product?.price && product.quantity
                              ? formatCurrency(
                                  product.product.price * product.quantity,
                                  order.currency
                                )
                              : "N/A"}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
