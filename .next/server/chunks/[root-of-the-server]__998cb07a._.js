module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/module [external] (module, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/sanity/env.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiVersion",
    ()=>apiVersion,
    "dataset",
    ()=>dataset,
    "projectId",
    ()=>projectId
]);
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-16';
const dataset = assertValue(("TURBOPACK compile-time value", "production"), 'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET');
const projectId = assertValue(("TURBOPACK compile-time value", "vdfkj56q"), 'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
function assertValue(v, errorMessage) {
    if (v === undefined) {
        throw new Error(errorMessage);
    }
    return v;
}
}),
"[project]/sanity/lib/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "client",
    ()=>client
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/env.ts [app-route] (ecmascript)");
;
;
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projectId"],
    dataset: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataset"],
    apiVersion: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiVersion"],
    useCdn: true,
    stega: {
        studioUrl: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : `${"TURBOPACK compile-time value", "http://localhost:3000"}/studio`
    }
});
}),
"[project]/sanity/lib/live.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SanityLive",
    ()=>SanityLive,
    "sanityFetch",
    ()=>sanityFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$next$2d$loader$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/next-loader/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/client.ts [app-route] (ecmascript)");
;
;
;
// Set your viewer token
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
    throw new Error("Missing SANITY_API_READ_TOKEN");
}
const { sanityFetch, SanityLive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$next$2d$loader$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defineLive"])({
    client: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["client"],
    serverToken: token,
    browserToken: token,
    fetchOptions: {
        revalidate: 0
    }
});
}),
"[project]/sanity/lib/sales/getActiveSaleByCouponCode.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActiveSaleByCouponCode",
    ()=>getActiveSaleByCouponCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2f$lib$2f$groq$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq/lib/groq.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$live$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/live.ts [app-route] (ecmascript)");
;
;
const getActiveSaleByCouponCode = async (couponCode)=>{
    const ACTIVE_SALE_BY_COUPON_QUERY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2f$lib$2f$groq$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defineQuery"])(`
    *[_type == "sale" && isActive == true && couponCode == $couponCode]
    | order(validFrom desc) [0]
  `);
    try {
        const activeSale = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$live$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanityFetch"])({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params: {
                couponCode
            }
        });
        return activeSale ? activeSale.data : null;
    } catch (error) {
        console.error("Error fetching active sale by coupon code:", error);
        return null;
    }
};
}),
"[project]/sanity/lib/sales/couponCodes.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// sanity/lib/sales/couponCodes.ts
__turbopack_context__.s([
    "COUPON_CODES",
    ()=>COUPON_CODES
]);
const COUPON_CODES = {
    BFRIDAY: "BFRIDAY",
    XMAS2021: "XMAS2021",
    NY2022: "NY2022"
};
 // This will be: "BFRIDAY" | "XMAS2021" | "NY2022"
}),
"[project]/app/api/sale/black-friday/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/sale/black-friday/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$sales$2f$getActiveSaleByCouponCode$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/sales/getActiveSaleByCouponCode.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$sales$2f$couponCodes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/sales/couponCodes.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        // This should pass the VALUE "BFRIDAY", not the key
        const sale = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$sales$2f$getActiveSaleByCouponCode$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getActiveSaleByCouponCode"])(__TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$sales$2f$couponCodes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["COUPON_CODES"].BFRIDAY);
        console.log("🔍 API Route - Sale result:", sale);
        if (!sale) {
            console.log("📭 API Route - No sale found");
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
                status: 404
            });
        }
        console.log("✅ API Route - Returning sale:", sale);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            title: sale.title,
            description: sale.description,
            couponCode: sale.couponCode,
            discountAmount: sale.discountAmount,
            isActive: sale.isActive
        });
    } catch (error) {
        console.error("💥 API Route - Error:", error);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__998cb07a._.js.map