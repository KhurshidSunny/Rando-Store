import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  PlusCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import "swiper/css";
import "swiper/css/pagination";
import ShopNowButton from "../components/ShopNowButton";

const images = [
  "/sliderImages/img1.jpg",
  "/sliderImages/img2.jpg",
  "/sliderImages/img3.jpg",
  "/sliderImages/img4.jpg",
  "/sliderImages/img5.jpg",
];

function Home() {
  return (
    <section className="relative">
      {/* Hero Slider */}
      <section className="h-screen relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet bg-white/50",
            bulletActiveClass: "swiper-pagination-bullet-active bg-white",
          }}
          loop={true}
          className="h-screen"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full">
                {/* Background image */}
                <img
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => {
                    console.error(`Failed to load image: ${img}`);
                  }}
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Home page content */}
                <div className="absolute inset-0 flex items-center justify-center ">
                  <div className="text-center text-white px-4 max-w-4xl">
                    <SparklesIcon className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                      Your Favorite Online Store
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                      Discover amazing random items from our community
                    </p>
                    {/* Button  */}
                    <ShopNowButton />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
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
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
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
              </div>
            </div>

            {/* Sell Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;
