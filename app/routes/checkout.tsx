import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { Header } from "~/components/header";
import { ActionFunction, json, redirect } from "@remix-run/cloudflare";
import { prisma } from "~/.server/prisma/prisma";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // Extract form fields
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("street") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const country = formData.get("country") as string;
  const zip = formData.get("zipCode") as string;
  const cartItems = JSON.parse(formData.get("cartItems") as string) as CartItem[];

  if (!name || !phone || !address || !city || !state || !country || !zip || cartItems.length === 0) {
    return json({ error: "All fields are required." }, { status: 400 });
  }

  // Create orders for each product in the cart
  const createdOrders = await prisma.$transaction(
    cartItems.map((item) =>
      prisma.order.create({
        data: {
          name,
          phone,
          address,
          city,
          state,
          country,
          zip,
          productId: item.id,
          quantity: item.quantity,
          total: item.quantity * item.price,
        },
      })
    )
  );

  // Clear cart after successful order placement
  return redirect(`/order-confirmation?orderId=${createdOrders[0].id}`);
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <form method="post" className="space-y-4">
            <input type="hidden" name="cartItems" value={JSON.stringify(cartItems)} />
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                id="street"
                name="street"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Place Order (Cash on Delivery)
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
