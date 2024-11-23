import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { prisma } from "~/.server/prisma/prisma";
import FloatingCart from "~/components/floating-cart";
import { Header } from "~/components/header";
import { useEffect, useState } from "react";

// Define the loader to fetch a single product by ID
export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const productId = parseInt(params.id || "0", 10);
  if (isNaN(productId) || productId <= 0) {
    throw new Response("Invalid product ID", { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return json({ product });
};

export default function ProductPage() {
  const { product } = useLoaderData();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const addToCart = () => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-600 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <button
              onClick={addToCart}
              className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      {cartItems.length > 0 && <FloatingCart />}
    </div>
  );
}
