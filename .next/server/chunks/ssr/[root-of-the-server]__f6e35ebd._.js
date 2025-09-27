module.exports = [
"[project]/components/Navbar.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Menu,
//   PackageIcon,
//   Search as SearchIcon,
//   ChevronDown,
//   ShoppingCart,
//   X,
// } from "lucide-react";
// import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
// import useBasketStore from "@/app/(store)/store/store";
// import { useUser as useClerkUser } from "@clerk/nextjs";
// export default function Header() {
//   const [isMounted, setIsMounted] = useState(false); // Prevent SSR hydration mismatch
//   const [isOpen, setIsOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryOpenMobile, setCategoryOpenMobile] = useState(false);
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user } = useUser();
//   const itemCount = useBasketStore((state) =>
//     state.items.reduce((total, item) => total + item.quantity, 0)
//   );
//   const navigation = [
//     { name: "Shoes", href: "/categories/shoes" },
//     { name: "Jeans", href: "/categories/jeans" },
//     { name: "Skateboard", href: "/categories/skateboard" },
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
//   useEffect(() => {
//     setIsMounted(true); // Enable client-side rendering
//   }, []);
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
//   if (!isMounted) return null;
//   return (
//     <header className="sticky top-0 z-50 w-full">
//       {/* Top Navbar */}
//       <div className="bg-orange-500 rounded-t-3xl ">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center h-20 justify-between relative px-4">
//             {/* Left: User / Sign In */}
//             <div className="flex items-center space-x-2 ml-4">
//               <ClerkLoaded>
//                 {user ? (
//                   <UserButton />
//                 ) : (
//                   <SignInButton mode="modal">
//                     <Button className="font-bold py-2 px-3 rounded-lg">
//                       Sign In
//                     </Button>
//                   </SignInButton>
//                 )}
//               </ClerkLoaded>
//               {/* Desktop Only: Orders & Basket */}
//               <div className="hidden md:flex items-center space-x-2">
//                 <ClerkLoaded>
//                   <SignedIn>
//                     <Link
//                       href="/orders"
//                       className="flex items-center text-white font-medium p-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
//                     >
//                       <PackageIcon className="w-5 h-5" />
//                     </Link>
//                   </SignedIn>
//                 </ClerkLoaded>
//                 <Link
//                   href="/basket"
//                   className="relative flex items-center text-white font-medium p-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
//                 >
//                   <ShoppingCart className="w-5 h-5" />
//                   {itemCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                       {itemCount}
//                     </span>
//                   )}
//                 </Link>
//               </div>
//             </div>
//             {/* Center: Logo */}
//             {!showSearch && (
//               <div className="absolute left-1/2 transform -translate-x-1/2">
//                 <Link href="/">
//                   <img
//                     src="/logo.png"
//                     alt="Logo"
//                     className="h-12 w-auto object-contain"
//                   />
//                 </Link>
//               </div>
//             )}
//             {/* Right: Search & Hamburger */}
//             <div className="flex items-center space-x-2 mr-4">
//               {!showSearch && (
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-white"
//                   onClick={() => setShowSearch(true)}
//                 >
//                   <SearchIcon className="h-6 w-6" />
//                 </Button>
//               )}
//               {/* Hamburger Menu */}
//               <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                 <SheetTrigger asChild>
//                   <Button variant="ghost" size="icon" className="text-white">
//                     <Menu className="h-6 w-6" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="w-[300px] sm:w-[400px]">
//                   <nav className="flex flex-col space-y-4 mt-8">
//                     {/* Orders & Basket */}
//                     <div className="flex flex-col space-y-2">
//                       <ClerkLoaded>
//                         <SignedIn>
//                           <Link
//                             href="/orders"
//                             className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
//                             onClick={() => setIsOpen(false)}
//                           >
//                             <PackageIcon className="w-5 h-5" /> My Orders
//                           </Link>
//                         </SignedIn>
//                       </ClerkLoaded>
//                       <Link
//                         href="/basket"
//                         className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         <ShoppingCart className="w-5 h-5" /> My Basket
//                       </Link>
//                     </div>
//                     {/* Categories Dropdown */}
//                     <div className="flex flex-col mt-4">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setCategoryOpenMobile(!categoryOpenMobile)
//                         }
//                         className="w-full flex justify-between items-center py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
//                       >
//                         Categories
//                         <ChevronDown className="w-4 h-4" />
//                       </button>
//                       {categoryOpenMobile && (
//                         <div className="mt-2 ml-2 flex flex-col space-y-1">
//                           {navigation.map((item) => (
//                             <Link
//                               key={item.name}
//                               href={item.href}
//                               className="py-1 px-3 rounded-lg hover:bg-gray-200"
//                               onClick={() => setIsOpen(false)}
//                             >
//                               {item.name}
//                             </Link>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </nav>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Search Overlay with Decorative Icons */}
//       {showSearch && (
//         <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-white p-4">
//           <button
//             onClick={() => setShowSearch(false)}
//             className="absolute top-8 right-8 p-2 text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//           {/* Decorative Icons */}
//           <div className="flex gap-6 mt-6 mb-4 text-gray-500">
//             <PackageIcon className="w-6 h-6" />
//             <ShoppingCart className="w-6 h-6" />
//             <SearchIcon className="w-6 h-6" />
//           </div>
//           {/* Search Input */}
//           <form className="flex w-full max-w-lg" onSubmit={handleSearchSubmit}>
//             <input
//               ref={searchInputRef}
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search for products..."
//               className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-base"
//             />
//             <button
//               type="submit"
//               className="px-5 py-3 bg-gray-900 text-white hover:bg-orange-400 hover: hover:text-gray-900 rounded-r-xl font-medium text-base"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       )}
//       {/* Desktop Categories Navbar */}
//       <div className="hidden md:block sticky top-20 z-40 0 bg-yellow-50 border-b-orange-400 border-gray-200 rounded-b-4xl">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="flex items-center justify-center space-x-8 h-12">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative text-sm font-medium pb-3 transition-colors ${
//                   item.name === "PROMO"
//                     ? "text-green-600 font-serif"
//                     : isActive(item.href)
//                       ? "text-orange-500 border-b-2 border-gray-900"
//                       : "text-gray-900 hover:text-orange-500"
//                 }`}
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
// function useUser(): { user: any } {
//   const { user } = useClerkUser();
//   return { user };
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.tsx [app-rsc] (ecmascript)");
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
                        className: "container mx-auto p-6 max-w-6xl bg-yellow-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f6e35ebd._.js.map