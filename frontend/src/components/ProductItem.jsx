import {
  EyeIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { useDeleteProduct } from "../hooks/useProducts";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const url = import.meta.env.VITE_LOCAL_URL;
  const { cartItems, addToCart, isCartInitialized, removeFromCart } = useCart();
  const { mutate: deleteProduct, isLoading } = useDeleteProduct();
  console.log(cartItems);

  const { id, name, price, img } = product;
  const isInCart = cartItems.some((item) => item.id === id);
  const imgUrl = img.split("/").slice(1).join("/");

  return (
    <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Product Image (clickable) */}
      <Link
        to={`/products/${id}`}
        className="block relative h-48 overflow-hidden"
      >
        <img
          src={`${url}/${imgUrl}`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Product Name (clickable) */}
        <Link to={`/products/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:underline">
            {name}
          </h3>
        </Link>
        <p className="text-2xl font-bold text-green-600 mb-4">
          ${parseFloat(price).toFixed(2)}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          {isCartInitialized && (
            <button
              onClick={(e) => {
                e.preventDefault();
                isInCart ? removeFromCart(id) : addToCart(product);
              }}
              className={`flex items-center space-x-2 px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${
                isInCart
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
            </button>
          )}

          {/* Delete Button (only if not in cart) */}
          {!isInCart && (
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteProduct(id);
              }}
              disabled={isLoading}
              className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition-all shadow-md"
              aria-label="Delete product"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
