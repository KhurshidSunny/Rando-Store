import { Link, useLocation } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartItems } = useCart();
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-200"
          >
            🛍️ Rando Store
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActivePath("/products")
                  ? "bg-white/20 text-white shadow-md"
                  : "text-blue-100 hover:text-white hover:bg-white/10"
              }`}
            >
              🛒 Buy Products
            </Link>
            <Link
              to="/create"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActivePath("/create")
                  ? "bg-white/20 text-white shadow-md"
                  : "text-blue-100 hover:text-white hover:bg-white/10"
              }`}
            >
              📦 Sell Products
            </Link>
          </nav>

          {/*  Cart */}
          <Link
            to="/checkout"
            className="relative p-3 text-white hover:text-blue-100 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <ShoppingCartIcon className="h-6 w-6" />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
              {cartItems.length}
            </span>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-4">
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePath("/products")
                  ? "bg-white/20 text-white"
                  : "text-blue-100 hover:text-white hover:bg-white/10"
              }`}
            >
              Buy Products
            </Link>
            <Link
              to="/create"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActivePath("/create")
                  ? "bg-white/20 text-white"
                  : "text-blue-100 hover:text-white hover:bg-white/10"
              }`}
            >
              Sell Products
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
