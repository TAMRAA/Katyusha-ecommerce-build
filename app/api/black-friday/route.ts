import { NextResponse } from "next/server";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";

export async function GET() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  return NextResponse.json({
    title: sale?.title ?? "",
    description: sale?.description ?? "",
    couponCode: sale?.couponCode ?? "",
    discountAmount: sale?.discountAmount ?? 0,
    isActive: sale?.isActive ?? false,
  });
}
