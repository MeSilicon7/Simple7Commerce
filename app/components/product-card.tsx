import { Link } from "@remix-run/react";
import { useState } from "react";
import { Notification } from "./notification";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = () => {
    if (typeof window === "undefined") return;

    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find((item: any) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <div className="mt-4 flex justify-between">
          <Link
            to={`/product/${id}`}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={addToCart}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {showNotification && <Notification message={`${name} added to cart`} />}
    </div>
  );
}