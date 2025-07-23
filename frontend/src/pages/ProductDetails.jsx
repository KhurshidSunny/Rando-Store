// src/pages/ProductDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useGetProduct(id);
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name,
      price: product?.price,
    },
    values: product
      ? {
          name: product.name,
          price: product.price,
        }
      : undefined,
  });

  const onSubmit = (data) => {
    updateProduct({
      id,
      data: {
        ...data,
        id,
        img: product.img,
      },
    });

    navigate("/products");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <img
          src={`/img/${product?.img?.split("/").pop()}`}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md mb-6"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border rounded-md px-4 py-2 focus:ring focus:ring-blue-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Product Price */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              className="w-full border rounded-md px-4 py-2 focus:ring focus:ring-blue-200"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
