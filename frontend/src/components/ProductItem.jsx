import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { useDeleteProduct } from "../hooks/useProducts"; // <-- Your custom hook
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const {
    cartItems,
    addToCart,
    isCartInitialized,
    removeFromCart
  } = useCart();

  const { mutate: deleteProduct, isLoading } = useDeleteProduct();


  const { id, name, price, img } = product;
  const isInCart = cartItems.some(item => item.id === id);


  return (
    <Link to={`/products/${id}`} className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
            <p className="text-2xl font-bold text-green-600 mb-4">
              ${parseFloat(price).toFixed(2)}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            {isCartInitialized && (
              <button
                onClick={() => {
                  isInCart ? removeFromCart(id) : addToCart(product)
                }}
                className={`flex items-center space-x-2 px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${
                  isInCart
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>{isInCart ? 'Remove from Cart' : 'Add to Cart'}</span>
              </button>
            )}

            {/* Delete Product From API Button */}
            {!isInCart && <button
              onClick={() => deleteProduct(id)}
              disabled={isLoading}
              className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition-all shadow-md"
              aria-label="Delete product"
            >
              <TrashIcon className="h-5 w-5" />
            </button>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
