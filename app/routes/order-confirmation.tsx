import { useEffect } from "react";
import { useSearchParams } from "@remix-run/react";
import { Header } from "../components/header"; // Adjust the path as needed

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // Clear the cart from localStorage when the page loads
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("storage")); // Notify other components of the cart update
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Order Confirmation</h1>
          <p className="text-xl mb-4 text-center">Thank you for your order!</p>
          <p className="text-lg mb-6 text-center">
            Your order ID is: <strong>{orderId}</strong>
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Details:</h2>
            <ul className="list-disc list-inside">
              <li>Order ID: {orderId}</li>
              <li>Date: {new Date().toLocaleDateString()}</li>
              <li>Payment Method: Cash on Delivery</li>
            </ul>
          </div>
          <p className="mb-6 text-sm text-gray-600">
            Please take a screenshot or print this page for your records. You may need this information for any future inquiries about your order.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handlePrint}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Print
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
