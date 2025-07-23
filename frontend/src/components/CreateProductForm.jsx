import {
  PhotoIcon,
  CurrencyDollarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../hooks/useProducts";

function CreateProductForm() {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      img: "",
    },
  });

  const handleGoBack = () => {
    navigate("/products");
  };

  const onSubmit = async (data) => {
    try {
      // Prepare product data to match your backend structure
      const productData = {
        name: data.name.trim(),
        price: data.price,
        img: `img/${data.img.trim()}`,
      };

      await createProductMutation.mutateAsync(productData);

      // Reset form and navigate back
      reset();
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const isLoading = createProductMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Product Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Product Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <TagIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 2,
                message: "Product name must be at least 2 characters",
              },
            })}
            placeholder="Enter product name"
            className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
              errors.name ? "border-red-300" : "border-gray-200"
            }`}
          />
        </div>
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Price ($)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 0.01,
                message: "Price must be greater than 0",
              },
            })}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
              errors.price ? "border-red-300" : "border-gray-200"
            }`}
          />
        </div>
        {errors.price && (
          <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      {/* Image Filename */}
      <div>
        <label
          htmlFor="img"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Image Filename
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PhotoIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="img"
            {...register("img", {
              required: "Image filename is required",
              pattern: {
                value: /\.(jpg|jpeg|png|webp|gif)$/i,
                message:
                  "Please enter a valid image filename (jpg, png, webp, gif)",
              },
            })}
            placeholder="e.g., product.jpg"
            className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
              errors.img ? "border-red-300" : "border-gray-200"
            }`}
          />
        </div>
        {errors.img && (
          <p className="mt-2 text-sm text-red-600">{errors.img.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={handleGoBack}
          className="flex-1 px-6 py-3 border-2 cursor-pointer border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
          disabled={isLoading}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl cursor-pointer font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </form>
  );
}
export default CreateProductForm;
