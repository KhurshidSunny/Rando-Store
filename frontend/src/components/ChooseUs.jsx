import { PlusCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ChooseUsCard from "./ChooseUsCard";

function ChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* why choose use section header  */}
        <header className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose RandoStore?
          </h2>
          <p className="text-xl text-gray-600">
            The best place to buy and sell unique items
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Buy Section */}
          <ChooseUsCard>
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Buy Amazing Items
            </h3>
            <p className="text-gray-600 mb-6">
              Browse through our collection of unique and random items from
              sellers around the world.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Start Shopping
            </Link>
          </ChooseUsCard>

          {/* Sell Section */}
          <ChooseUsCard>
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <PlusCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Sell Your Items
            </h3>
            <p className="text-gray-600 mb-6">
              Got something interesting to sell? List it on our platform and
              reach thousands of buyers.
            </p>
            <Link
              to="/create"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Start Selling
            </Link>
          </ChooseUsCard>
        </div>
      </div>
    </section>
  );
}
export default ChooseUs;
