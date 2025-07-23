// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Checkout";
import CreateProduct from "./pages/CreateProduct";
import { CartProvider } from "./context/CartContext";
import ProductDetails from "./pages/ProductDetails";

// Create a QueryClient instance for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/:id" element={<ProductDetails />} />
                <Route path="create" element={<CreateProduct />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>

            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}