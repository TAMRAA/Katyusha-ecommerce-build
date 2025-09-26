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
//     <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
//       {/* Top bar */}
//       <div className="border-b border-gray-50 bg-orange-500">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between relative">
//             {/* Desktop User / Orders / Basket */}
//             <div className="hidden md:flex items-center space-x-2 min-w-[120px]">
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
//                     className="flex items-center text-gray-800 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                   >
//                     <PackageIcon className="w-5 h-5" />
//                   </Link>
//                 </SignedIn>
//               </ClerkLoaded>

//               <Link
//                 href="/basket"
//                 className="relative flex items-center text-gray-800 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <TrolleyIcon className="w-5 h-5" />
//                 {itemCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                     {itemCount}
//                   </span>
//                 )}
//               </Link>
//             </div>

//             {/* Mobile Basket */}
//             <div className="flex md:hidden items-center">
//               <Link
//                 href="/basket"
//                 className="relative flex items-center text-white p-2 rounded-lg"
//               >
//                 <TrolleyIcon className="w-6 h-6" />
//                 {itemCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
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
//                   className="text-gray-600"
//                   onClick={() => setShowSearch(true)}
//                 >
//                   <SearchIcon className="h-6 w-6" />
//                 </Button>
//               ) : (
//                 <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
//                   <div className="relative w-full max-w-lg">
//                     {/* Close X */}
//                     <button
//                       onClick={() => setShowSearch(false)}
//                       className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900"
//                     >
//                       <X className="w-6 h-6" />
//                     </button>

//                     {/* Icons */}
//                     <div className="flex items-center justify-center gap-10 text-gray-600 mb-6">
//                       {/* Replace with your 3 icon blocks */}
//                     </div>

//                     {/* Search form */}
//                     <form className="flex w-full" onSubmit={handleSearchSubmit}>
//                       <input
//                         ref={searchInputRef}
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search for products..."
//                         className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                       />
//                       <button
//                         type="submit"
//                         className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-r-xl font-medium"
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
//                     <Menu className="h-5 w-5" />
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
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PackageIcon, Search as SearchIcon, X } from "lucide-react";
import { TrolleyIcon } from "@sanity/icons";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import useBasketStore from "@/app/(store)/store/store";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    if (showSearch && searchInputRef.current) searchInputRef.current.focus();
  }, [showSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSearch(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const createClerkPasskey = async () => {
    if (!user) return;
    try {
      const response = await user.createPasskey();
      console.log("Passkey created:", response);
    } catch (err) {
      console.error("Error creating passkey:", err);
    }
  };

  const navigation = [
    { name: "Shoes", href: "/categories/Shoes" },
    { name: "Streetwear", href: "/categories/Streetwear" },
    { name: "Skateboard", href: "/categories/jeans" },
    { name: "Snowboard", href: "/categories/Snowboard" },
    { name: "Accessori", href: "/categories/Accessori" },
    { name: "Marchi", href: "/categories/Marchi" },
    { name: "PROMO", href: "/categories/Promo" },
    { name: "Gift Card", href: "/Gift-card" },
    { name: "Store & Family", href: "/Store-family" },
  ];

  const isActive = (href: string) =>
    href === pathname || (href !== "/" && pathname.startsWith(href));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setShowSearch(false);
    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      {/* Top bar */}
      <div className="border-b border-gray-50 bg-orange-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between relative">
            {/* Desktop User / Orders / Basket */}
            <div className="hidden md:flex items-center space-x-2 min-w-[120px]">
              <ClerkLoaded>
                {user ? (
                  <UserButton />
                ) : (
                  <SignInButton mode="modal">
                    <Button className="font-medium py-2 px-3 rounded-lg">
                      Sign In
                    </Button>
                  </SignInButton>
                )}
              </ClerkLoaded>

              <ClerkLoaded>
                <SignedIn>
                  <Link
                    href="/orders"
                    className="flex items-center text-gray-800 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <PackageIcon className="w-5 h-5" />
                  </Link>
                </SignedIn>
              </ClerkLoaded>

              <Link
                href="/basket"
                className="relative flex items-center text-gray-800 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <TrolleyIcon className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Basket */}
            <div className="flex md:hidden items-center">
              <Link
                href="/basket"
                className="relative flex items-center text-white p-2 rounded-lg"
              >
                <TrolleyIcon className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Logo */}
            {!showSearch && (
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                <Link href="/">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-12 w-auto object-contain"
                  />
                </Link>
              </div>
            )}

            {/* Search & Hamburger */}
            <div className="flex items-center space-x-2 ml-auto">
              {!showSearch ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600"
                  onClick={() => setShowSearch(true)}
                >
                  <SearchIcon className="h-6 w-6" />
                </Button>
              ) : (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
                  {/* Close X at top-right */}
                  <button
                    onClick={() => setShowSearch(false)}
                    className="absolute top-8 right-8 md:top-6 md:right-12 p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-7 h-7" />
                  </button>

                  <div className="w-full max-w-lg mx-auto flex flex-col items-center">
                    {/* Icon row (customize as needed) */}
                    <div className="flex items-center justify-center gap-10 text-gray-500 mb-8 mt-2">
                      <PackageIcon className="w-6 h-6" />
                      <TrolleyIcon className="w-6 h-6" />
                      <SearchIcon className="w-6 h-6" />
                    </div>

                    {/* Search form */}
                    <form
                      className="flex w-full"
                      onSubmit={handleSearchSubmit}
                      autoComplete="off"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products..."
                        className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
                      />
                      <button
                        type="submit"
                        className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-r-xl font-medium text-base"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Hamburger */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-8 h-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors hover:text-primary pb-3 ${
                  item.name === "PROMO"
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700"
                } ${isActive(item.href) ? "border-b-2 border-primary" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}