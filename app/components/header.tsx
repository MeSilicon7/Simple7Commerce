import { Link } from "@remix-run/react";
import { ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          SimpleShop
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/cart" className="text-gray-600 hover:text-gray-800 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-1" />
                Cart
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/notice" className="text-gray-600 hover:text-gray-800">
                Notice
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}