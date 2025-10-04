import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import { Search, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Search Results</h1>
          </div>

          <p className="text-lg text-gray-600">
            {products.length === 0
              ? `No products found for "${query}"`
              : `Found ${products.length} product${products.length !== 1 ? "s" : ""} for "${query}"`}
          </p>
          <br />
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all products
          </Link>
        </div>

        {/* Results */}
        {products.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Results Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any products matching "<strong>{query}</strong>".
              Try checking your spelling or using different keywords.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Browse All Products
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Try Another Search
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8">
            <ProductGrid products={products} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
