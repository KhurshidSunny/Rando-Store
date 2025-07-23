import { useNavigate } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";
import { ArrowLeftIcon, TagIcon } from "@heroicons/react/24/outline";

function CreateProduct() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/products");
  };

  return (
    <div className="  min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-12">
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
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <TagIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600">Add a new product</p>
        </header>

        {/* Form Component */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <CreateProductForm />
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
