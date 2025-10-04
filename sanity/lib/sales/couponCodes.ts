// sanity/lib/sales/couponCodes.ts
export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
  XMAS2021: "XMAS2021",
  NY2022: "NY2022",
} as const;

// Fix: Use the value type, not the key type
export type CouponCode = (typeof COUPON_CODES)[keyof typeof COUPON_CODES];
// This will be: "BFRIDAY" | "XMAS2021" | "NY2022"
