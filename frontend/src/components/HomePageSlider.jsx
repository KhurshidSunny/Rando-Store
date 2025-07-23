import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ShopNowButton from "../components/ShopNowButton";
import "swiper/css";
import "swiper/css/pagination";
import { SparklesIcon } from "@heroicons/react/24/outline";

const images = [
  "/sliderImages/img1.jpg",
  "/sliderImages/img2.jpg",
  "/sliderImages/img3.jpg",
  "/sliderImages/img4.jpg",
  "/sliderImages/img5.jpg",
];

function HomePageSlider() {
  return (
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
  );
}
export default HomePageSlider;
