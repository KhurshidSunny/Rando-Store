import { useState } from "react";
import ProductItem from "../components/ProductItem";
import SearchInput from "../components/SearchInput";
import SortSelector from "../components/SortSelector";
import { sortProducts, filterProducts } from "../utils/productUtils";
import { useCart } from "../context/CartContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

function Checkout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { cartItems, updateQuantity, clearCart, isCartInitialized } = useCart();

  if (!isCartInitialized) {
    return <LoadingSpinner />;
  }

  const filtered = filterProducts(cartItems, searchTerm);
  const sorted = sortProducts(filtered, sortBy);

  const total = sorted?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        {cartItems?.length > 0 ? (
          <>
            {/* Cart Summary */}
            <header className="bg-white rounded-xl shadow-lg p-6 mb-8 border">
              <div className="flex flex-col lg:flex-row justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
                  <p className="text-lg text-gray-600">
                    {totalItems} item{totalItems > 1 ? "s" : ""} in your cart
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-4xl font-bold text-blue-600 mb-4">
                    ${total.toFixed(2)}
                  </p>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={clearCart}
                      className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <SearchInput
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search cart items..."
              />
              <SortSelector
                sortBy={sortBy}
                onSortChange={setSortBy}
                className="min-w-[200px]"
              />
            </div>

            {/* Results Info */}
            <div className="text-center mb-8 text-gray-600">
              {searchTerm || sortBy ? (
                <>
                  Showing {sorted.length} of {cartItems?.length} items
                  {searchTerm && (
                    <span className="text-blue-600 ml-1">
                      matching "{searchTerm}"
                    </span>
                  )}
                </>
              ) : (
                <>Showing all {cartItems?.length} items</>
              )}
            </div>

            {/* Cart Items */}
            {sorted.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sorted.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow border overflow-hidden"
                  >
                    <ProductItem product={item} />
                    <div className="p-4 border-t bg-gray-50  ">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-white hover:bg-red-50 border text-red-500 font-bold"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 rounded border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-white hover:bg-green-50 border text-green-500 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* subtotal  */}
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-sm text-gray-500">Subtotal:</span>
                        <span className="font-bold text-blue-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow border">
                <p className="text-gray-500 text-xl">
                  No items match your filters or search.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSortBy("");
                  }}
                  className="mt-4 px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <ShoppingBagIcon className="w-32 h-32 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-6">
              Looks like you haven't added any items yet.
            </p>
            <a
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow"
            >
              Start Shopping
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default Checkout;
