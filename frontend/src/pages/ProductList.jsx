// src/pages/ProductList.jsx
import { useState } from 'react';
import ProductItem from '../components/ProductItem';
import SearchInput from '../components/SearchInput';
import SortSelector from '../components/SortSelector';
import { useProducts } from '../hooks/useProducts';
import { sortProducts, filterProducts } from '../utils/productUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Fetch products using the custom hook
  const { data: products = [], isLoading, isError, error } = useProducts();
  

  // Apply filtering and sorting
  const filteredProducts = filterProducts(products, searchTerm);
  const sortedProducts = sortProducts(filteredProducts, sortBy);



  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Loading state
  if (isLoading) return <LoadingSpinner />

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
          </div>
          
          {/* Error state */}
          <ErrorMessage message={error?.message} onRetry={() => window.location.reload()} />
          {/* <div className="text-center py-20">
            <div className="text-red-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
            <p className="text-gray-500 mb-4">{error?.message || 'Something went wrong while fetching products'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Try Again
            </button>
          </div> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our amazing collection of high-quality products at unbeatable prices
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <SearchInput
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            placeholder="Search for products..."
            className="w-full sm:w-auto"
          />
          
          <SortSelector
            sortBy={sortBy}
            onSortChange={handleSortChange}
            className="w-full sm:w-auto min-w-[200px]"
          />
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {searchTerm || sortBy ? (
              <>Showing {sortedProducts.length} of {products.length} products</>
            ) : (
              <>Showing all {products.length} products</>
            )}
            {searchTerm && (
              <span className="text-blue-600 ml-1">
                for "{searchTerm}"
              </span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductItem
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? (
                <>
                  No products match your search for "{searchTerm}".
                  <br />
                  Try adjusting your search terms.
                </>
              ) : (
                'Products will appear here once they are added to the inventory.'
              )}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Clear Filters */}
        {(searchTerm || sortBy) && sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setSearchTerm('');
                setSortBy('');
              }}
              className="text-gray-600 hover:text-gray-800 underline transition-colors duration-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;