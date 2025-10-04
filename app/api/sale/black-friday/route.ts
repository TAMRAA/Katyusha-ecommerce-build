// app/api/sale/black-friday/route.ts
import { NextResponse } from "next/server";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";

export async function GET() {
  try {
    // This should pass the VALUE "BFRIDAY", not the key
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

    console.log("🔍 API Route - Sale result:", sale);

    if (!sale) {
      console.log("📭 API Route - No sale found");
      return new NextResponse(null, { status: 404 });
    }

    console.log("✅ API Route - Returning sale:", sale);
    return NextResponse.json({
      title: sale.title,
      description: sale.description,
      couponCode: sale.couponCode,
      discountAmount: sale.discountAmount,
      isActive: sale.isActive,
    });
  } catch (error) {
    console.error("💥 API Route - Error:", error);
    return new NextResponse(null, { status: 500 });
  }
}
