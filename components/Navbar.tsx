"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menu,
  PackageIcon,
  Search as SearchIcon,
  ChevronDown,
  ShoppingCart,
  X,
  User,
} from "lucide-react";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import useBasketStore from "@/app/(store)/store/store";
import { useUser as useClerkUser } from "@clerk/nextjs";

function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryOpenMobile, setCategoryOpenMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Unified color scheme for all navigation items
  const unifiedGradient = "from-orange-500 to-red-500";
  const unifiedHoverGradient = "from-orange-600 to-red-600";
  const activeTextColor = "text-white";
  const inactiveTextColor = "text-gray-600 hover:text-gray-900";

  const navigation = [
    { name: "Shoes", href: "/categories/shoes" },
    { name: "Jeans", href: "/categories/jeans" },
    { name: "Skateboard", href: "/categories/skateboard" },
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

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSearch(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Navbar */}
      <motion.div
        className={`bg-gradient-to-r from-orange-500 to-red-500 rounded-t-3xl shadow-lg transition-all duration-300 ${
          isScrolled ? "shadow-xl" : "shadow-md"
        }`}
        initial={false}
        animate={{
          height: isScrolled ? "70px" : "80px",
          boxShadow: isScrolled
            ? "0 10px 30px rgba(0,0,0,0.1)"
            : "0 4px 12px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full relative">
            {/* Left Section - User & Icons */}
            <div className="flex items-center space-x-3 flex-1 justify-start">
              <ClerkLoaded>
                {user ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserButton />
                  </motion.div>
                ) : (
                  <SignInButton mode="modal">
                    <Button className="font-bold py-2 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </SignInButton>
                )}
              </ClerkLoaded>

              {/* Desktop Only: Basket + Orders */}
              <div className="hidden md:flex items-center space-x-3">
                <motion.div
                  key={itemCount}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative flex items-center"
                >
                  <Link
                    href="/basket"
                    className="flex items-center text-white font-medium p-2 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
                      >
                        {itemCount}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>

                <ClerkLoaded>
                  <SignedIn>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/orders"
                        className="flex items-center text-white font-medium p-2 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30"
                      >
                        <PackageIcon className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </SignedIn>
                </ClerkLoaded>
              </div>
            </div>

            {/* Center - Logo */}
            {!showSearch && (
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/" className="flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className={`${isScrolled ? "h-10" : "h-12"} w-auto object-contain transition-all duration-300 filter drop-shadow-lg`}
                  />
                </Link>
              </motion.div>
            )}

            {/* Right Section - Search & Menu */}
            <div className="flex items-center space-x-3 flex-1 justify-end">
              {/* Search Button */}
              {!showSearch && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 backdrop-blur-sm rounded-xl border border-transparent hover:border-white/30 w-10 h-10 md:w-12 md:h-12"
                    onClick={() => setShowSearch(true)}
                  >
                    <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                </motion.div>
              )}

              {/* Hamburger Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 backdrop-blur-sm rounded-xl border border-transparent hover:border-white/30 w-10 h-10 md:w-12 md:h-12"
                    >
                      <Menu className="w-5 h-5 md:w-6 md:h-6" />
                    </Button>
                  </motion.div>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full max-w-[400px] sm:w-[400px] bg-gradient-to-b from-white to-gray-50 border-l border-gray-200 overflow-y-auto"
                >
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col space-y-6 mt-8"
                  >
                    {/* Search Bar */}
                    <form
                      className="flex w-full px-4"
                      onSubmit={handleSearchSubmit}
                    >
                      <div className="flex w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="flex-1 px-4 py-3 text-gray-800 focus:outline-none text-base"
                        />
                        <button
                          type="submit"
                          className="px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                        >
                          <SearchIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </form>

                    {/* Categories Section */}
                    <div className="flex flex-col mt-2 px-4">
                      <motion.button
                        type="button"
                        onClick={() =>
                          setCategoryOpenMobile(!categoryOpenMobile)
                        }
                        className="w-full flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-r from-gray-50 to-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-semibold text-gray-800">
                          Categories
                        </span>
                        <motion.div
                          animate={{ rotate: categoryOpenMobile ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {categoryOpenMobile && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 ml-2 flex flex-col space-y-2"
                          >
                            {navigation.map((item, index) => (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`block py-2 px-4 rounded-lg transition-all duration-300 font-medium ${
                                    isActive(item.href)
                                      ? `bg-gradient-to-r ${unifiedGradient} text-white shadow-md`
                                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col space-y-3 px-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href="/basket"
                          className="flex items-center py-3 px-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-md transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          <ShoppingCart className="w-5 h-5 mr-3 text-blue-600" />
                          <span className="font-semibold text-gray-800">
                            My Basket
                          </span>
                          {itemCount > 0 && (
                            <span className="ml-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                              {itemCount}
                            </span>
                          )}
                        </Link>
                      </motion.div>

                      <ClerkLoaded>
                        <SignedIn>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              href="/orders"
                              className="flex items-center py-3 px-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:shadow-md transition-all duration-300"
                              onClick={() => setIsOpen(false)}
                            >
                              <PackageIcon className="w-5 h-5 mr-3 text-green-600" />
                              <span className="font-semibold text-gray-800">
                                My Orders
                              </span>
                            </Link>
                          </motion.div>
                        </SignedIn>
                      </ClerkLoaded>
                    </div>
                  </motion.div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Products
                </h2>
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="flex w-full" onSubmit={handleSearchSubmit}>
                <div className="flex w-full bg-gray-50 rounded-2xl overflow-hidden border-2 border-gray-200 focus-within:border-orange-500 transition-all duration-300">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="flex-1 px-6 py-4 text-gray-800 bg-transparent focus:outline-none text-lg"
                  />
                  <button
                    type="submit"
                    className="px-8 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold"
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="mt-6 flex justify-center space-x-8 text-gray-400">
                <div className="text-center">
                  <PackageIcon className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm">Orders</span>
                </div>
                <div className="text-center">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm">Basket</span>
                </div>
                <div className="text-center">
                  <SearchIcon className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm">Search</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Categories Navbar */}
      <motion.div
        className="hidden md:block sticky top-20 z-40 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200/50 rounded-b-3xl shadow-sm"
        initial={false}
        animate={{
          top: isScrolled ? "70px" : "80px",
          opacity: isScrolled ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-6 h-14">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`relative text-sm font-semibold pb-1 transition-all duration-300 ${
                    isActive(item.href)
                      ? `bg-gradient-to-r ${unifiedGradient} bg-clip-text text-transparent`
                      : inactiveTextColor
                  }`}
                >
                  {item.name}
                </Link>
                {isActive(item.href) && (
                  <motion.span
                    layoutId="underline"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r ${unifiedGradient}`}
                  />
                )}
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  );
}

function useUser(): { user: any } {
  const { user } = useClerkUser();
  return { user };
}
