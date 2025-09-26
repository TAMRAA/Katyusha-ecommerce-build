import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 rounded-2xl">
      <div className="container-custom">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Brand Column */}
          <div className="flex flex-col items-center justify-center">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tight text-white block mb-4"
            >
              Trivo
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Authentic streetwear for those who live the culture. Est. 2022
            </p>
          </div>

          {/* Shop Column */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-semibold text-lg text-white mb-4 uppercase tracking-wide">
              Shop
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=t-shirts"
                  className="hover:text-white transition-colors"
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=hoodies"
                  className="hover:text-white transition-colors"
                >
                  Hoodies
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=pants"
                  className="hover:text-white transition-colors"
                >
                  Pants
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=accessories"
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-semibold text-lg text-white mb-4 uppercase tracking-wide">
              Customer Service
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col items-center text-center space-y-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Trivo Streetwear. All rights
            reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter/X" className="hover:text-white">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <FaLinkedinIn className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white">
              <FaYoutube className="h-5 w-5" />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-white">
              <FaTiktok className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Pinterest" className="hover:text-white">
              <FaPinterestP className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
