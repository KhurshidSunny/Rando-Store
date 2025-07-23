import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function ShopNowButton() {
  return (
    <Link
      to="/products"
      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
    >
      <ShoppingBagIcon className="h-6 w-6" />
      <span>Shop Now</span>
    </Link>
  );
}
export default ShopNowButton;
