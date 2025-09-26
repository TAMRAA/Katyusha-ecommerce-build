"use server";
import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Orders() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 sm:mb-10">
          My Orders
        </h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg font-medium">
              You have not placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Order Number
                      </p>
                      <p className="font-mono text-sm text-green-600 break-all">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Order Date
                      </p>
                      <p className="font-medium text-gray-800">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-600 mr-2">
                        Status:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Total Amount
                      </p>
                      <p className="font-bold text-lg text-gray-900">
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </p>
                    </div>
                  </div>
                  {order.amountDiscount ? (
                    <div className="mt-4 p-4 sm:p-5 bg-gray-200 rounded-lg font-semibold mb-1 text-sm sm:text-base">
                      <p className="text-sm text-green-600">
                        Original Subtotal:{" "}
                        {formatCurrency(
                          (order.totalPrice ?? 0) + order.amountDiscount,
                          order.currency
                        )}
                      </p>
                      <p className="text-red-500 font-semibold mb-1 text-sm sm:text-base">
                        Discount Applied:{" "}
                        {formatCurrency(order.amountDiscount, order.currency)}
                      </p>
                    </div>
                  ) : null}
                  <div className="px-4 py-4 sm:px-6 sm:py-5">
                    <p className="text-sm font-semibold text-gray-600 mb-4 sm:mb-5">
                      Order Items
                    </p>
                    <div className="space-y-4 sm:space-y-5">
                      {order.products?.map((product) => (
                        <div
                          key={product._key}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-3 border-b last:border-b-0 border-gray-200"
                        >
                          <div className="flex items-center gap-4 sm:gap-5">
                            {product.product?.image && (
                              <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                                <Image
                                  src={imageUrl(product.product.image).url()}
                                  alt={product.product?.name ?? ""}
                                  className="object-cover"
                                  fill
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-sm sm:text-base text-gray-800">
                                {product.product?.name ?? "Unknown Product"}
                              </p>
                              <p className="text-sm text-gray-600">
                                Quantity: {product.quantity ?? "N/A"}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-sm sm:text-base text-gray-800 text-right">
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
