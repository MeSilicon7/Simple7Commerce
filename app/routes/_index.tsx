import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import React from "react";
import { Header } from "~/components/header";
import { ProductCard } from "~/components/product-card";
import FloatingCart from "~/components/floating-cart";
import { prisma } from "~/.server/prisma/prisma";

const PRODUCTS_PER_PAGE = 6; // Number of products to display per page

// Loader function for server-side data fetching
export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  // Fetch paginated products
  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      skip: (page - 1) * PRODUCTS_PER_PAGE,
      take: PRODUCTS_PER_PAGE,
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return json({ products, totalPages, currentPage: page });
};

export default function Index() {
  const { products, totalPages, currentPage } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  // Hydrating cart items (client-side only)
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);

    const handleStorage = () => {
      const updatedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setCartItems(updatedItems);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`px-4 py-2 rounded ${
              currentPage <= 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`px-4 py-2 rounded ${
              currentPage >= totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            }`}
          >
            Next
          </button>
        </div>
        <p className="text-center mt-4">
          Page {currentPage} of {totalPages}
        </p>
      </main>
      {cartItems.length > 0 && <FloatingCart />}
    </div>
  );
}
