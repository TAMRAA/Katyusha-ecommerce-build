module.exports = [
"[project]/components/Header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu, PackageIcon, Search as SearchIcon, X } from "lucide-react";
// import { TrolleyIcon } from "@sanity/icons";
// import {
//   ClerkLoaded,
//   SignedIn,
//   SignInButton,
//   UserButton,
//   useUser,
// } from "@clerk/nextjs";
// import useBasketStore from "@/app/(store)/store/store";
// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user } = useUser();
//   const itemCount = useBasketStore((state) =>
//     state.items.reduce((total, item) => total + item.quantity, 0)
//   );
//   useEffect(() => {
//     if (showSearch && searchInputRef.current) searchInputRef.current.focus();
//   }, [showSearch]);
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setShowSearch(false);
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);
//   const createClerkPasskey = async () => {
//     if (!user) return;
//     try {
//       const response = await user.createPasskey();
//       console.log("Passkey created:", response);
//     } catch (err) {
//       console.error("Error creating passkey:", err);
//     }
//   };
//   const navigation = [
//     { name: "Shoes", href: "/categories/Shoes" },
//     { name: "Streetwear", href: "/categories/Streetwear" },
//     { name: "Skateboard", href: "/categories/jeans" },
//     { name: "Snowboard", href: "/categories/Snowboard" },
//     { name: "Accessori", href: "/categories/Accessori" },
//     { name: "Marchi", href: "/categories/Marchi" },
//     { name: "PROMO", href: "/categories/Promo" },
//     { name: "Gift Card", href: "/Gift-card" },
//     { name: "Store & Family", href: "/Store-family" },
//   ];
//   const isActive = (href: string) =>
//     href === pathname || (href !== "/" && pathname.startsWith(href));
//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;
//     setShowSearch(false);
//     router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//   };
//   return (
//     <header className="sticky top-0 z-50 w-full bg-gray-900 border-b border-orange-500">
//       {/* Top bar */}
//       <div className="text-white ">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
//           <div className="flex h-19 items-center justify-between relative border border-orange-500 rounded-lg">
//             {/* Desktop User / Orders / Basket */}
//             <div className="flex md:flex justify-between items-center space-x-2 min-w-[120px] border-orange-500 ">
//               <ClerkLoaded>
//                 {user ? (
//                   <UserButton />
//                 ) : (
//                   <SignInButton mode="modal">
//                     <Button className="font-medium py-2 px-3 rounded-lg">
//                       Sign In
//                     </Button>
//                   </SignInButton>
//                 )}
//               </ClerkLoaded>
//               <ClerkLoaded>
//                 <SignedIn>
//                   <Link
//                     href="/orders"
//                     className="flex items-center text-white font-medium p-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
//                   >
//                     <PackageIcon className="w-5 h-5" />
//                   </Link>
//                 </SignedIn>
//               </ClerkLoaded>
//               <Link
//                 href="/basket"
//                 className="relative flex items-center text-white font-medium p-2 rounded-lg hover:bg-white hover:text-gray-900 ransition-colors"
//               >
//                 <TrolleyIcon className="w-5 h-5" />
//                 {itemCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {itemCount}
//                   </span>
//                 )}
//               </Link>
//             </div>
//             {/* Logo */}
//             {!showSearch && (
//               <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
//                 <Link href="/">
//                   <img
//                     src="/logo.png"
//                     alt="Logo"
//                     className="h-12 w-auto object-contain"
//                   />
//                 </Link>
//               </div>
//             )}
//             {/* Search & Hamburger */}
//             <div className="flex items-center space-x-2 ml-auto">
//               {!showSearch ? (
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-white "
//                   onClick={() => setShowSearch(true)}
//                 >
//                   <SearchIcon className="h-6 w-6" />
//                 </Button>
//               ) : (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
//                   {/* Close X at top-right */}
//                   <button
//                     onClick={() => setShowSearch(false)}
//                     className="absolute top-8 right-8 md:top-6 md:right-12 p-2 text-gray-600 hover:text-gray-900 transition-colors"
//                     aria-label="Close search"
//                   >
//                     <X className="w-7 h-7" />
//                   </button>
//                   <div className="w-full max-w-lg mx-auto flex flex-col items-center">
//                     {/* Icon row (customize as needed) */}
//                     <div className="flex items-center justify-center gap-10 text-gray-500 mb-8 mt-2">
//                       <PackageIcon className="w-6 h-6" />
//                       <TrolleyIcon className="w-6 h-6" />
//                       <SearchIcon className="w-6 h-6" />
//                     </div>
//                     {/* Search form */}
//                     <form
//                       className="flex w-full"
//                       onSubmit={handleSearchSubmit}
//                       autoComplete="off"
//                     >
//                       <input
//                         ref={searchInputRef}
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search for products..."
//                         className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
//                       />
//                       <button
//                         type="submit"
//                         className="px-5 py-3 bg-orange-500 hover:bg-gray-900 text-white rounded-r-xl font-medium text-base"
//                       >
//                         Search
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               )}
//               {/* Hamburger */}
//               <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon">
//                     <Menu className="h-6 w-6" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//                   <nav className="flex flex-col space-y-4 mt-8">
//                     {navigation.map((item) => (
//                       <Link
//                         key={item.name}
//                         href={item.href}
//                         className="text-lg font-medium hover:text-primary transition-colors"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {item.name}
//                       </Link>
//                     ))}
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Desktop navigation */}
//       <div className="hidden md:block">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="flex items-center justify-center space-x-8 h-12">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative text-sm font-medium transition-colors hover:text-primary pb-3 ${
//                   item.name === "PROMO"
//                     ? "text-orange-500 font-semibold"
//                     : "text-gray-700"
//                 } ${isActive(item.href) ? "border-b-2 border-primary" : ""}`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/sanity/env.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/sanity/lib/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "client",
    ()=>client
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/env.ts [app-rsc] (ecmascript)");
;
;
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["projectId"],
    dataset: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dataset"],
    apiVersion: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiVersion"],
    useCdn: true,
    stega: {
        studioUrl: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : `${"TURBOPACK compile-time value", "http://localhost:3000"}/studio`
    }
});
}),
"[project]/sanity/lib/live.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SanityLive",
    ()=>SanityLive,
    "sanityFetch",
    ()=>sanityFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$next$2d$loader$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/next-loader/dist/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/client.ts [app-rsc] (ecmascript)");
;
;
;
// Set your viewer token
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
    throw new Error("Missing SANITY_API_READ_TOKEN");
}
const { sanityFetch, SanityLive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$next$2d$loader$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defineLive"])({
    client: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"],
    serverToken: token,
    browserToken: token,
    fetchOptions: {
        revalidate: 0
    }
});
}),
"[project]/app/(store)/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$live$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/live.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const metadata = {
    title: "Ecommerce App",
    description: "Generated by create next app"
};
async function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ClerkProvider"], {
        dynamic: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
            lang: "en",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: "min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-900",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "container mx-auto p-6 max-w-6xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/app/(store)/layout.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            children
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(store)/layout.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$live$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SanityLive"], {}, void 0, false, {
                        fileName: "[project]/app/(store)/layout.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(store)/layout.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(store)/layout.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(store)/layout.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__16ff13d7._.js.map