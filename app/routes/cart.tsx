import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { Header } from '../components/header'; // Update the path to match your Remix project structure

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
              <Link to="/checkout">
                <button className="mt-4 w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
