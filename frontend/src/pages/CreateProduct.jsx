import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCreateProduct } from '../hooks/useProducts';
import { 
  PhotoIcon, 
  CurrencyDollarIcon, 
  TagIcon,
  ArrowLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

function CreateProduct() {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      img: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      // Prepare product data to match your backend structure
      const productData = {
        name: data.name.trim(),
        price: data.price,
        img: `./img/${data.img.trim()}` // Prepend ./img/ to match backend format
      };

      await createProductMutation.mutateAsync(productData);
      
      // Reset form and navigate back
      reset();
      setTimeout(() => {
        navigate('/products');
      }, 1500);

    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/products');
  };

  const isSuccess = createProductMutation.isSuccess;
  const isLoading = createProductMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-300 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Products
        </button>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <TagIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600">
            Add a new product
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
            <div className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-green-400 mr-3" />
              <div>
                <p className="text-green-800 font-medium">Product created successfully!</p>
                <p className="text-green-700 text-sm">Redirecting...</p>
              </div>
              
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TagIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Product name is required',
                    minLength: {
                      value: 2,
                      message: 'Product name must be at least 2 characters'
                    }
                  })}
                  placeholder="Enter product name"
                  className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.name ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="price"
                  {...register('price', {
                    required: 'Price is required',
                    min: {
                      value: 0.01,
                      message: 'Price must be greater than 0'
                    }
                  })}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.price ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.price && (
                <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            {/* Image Filename */}
            <div>
              <label htmlFor="img" className="block text-sm font-semibold text-gray-700 mb-2">
                Image Filename
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhotoIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="img"
                  {...register('img', {
                    required: 'Image filename is required',
                    pattern: {
                      value: /\.(jpg|jpeg|png|webp|gif)$/i,
                      message: 'Please enter a valid image filename (jpg, png, webp, gif)'
                    }
                  })}
                  placeholder="e.g., product.jpg"
                  className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.img ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.img && (
                <p className="mt-2 text-sm text-red-600">{errors.img.message}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Enter just the filename (e.g., product.jpg). It will be stored in ./img/ directory
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                disabled={isLoading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  'Create Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;