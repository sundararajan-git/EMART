import { Button } from "@/components/ui/button";
import BestSellers from "./components/BestSellers";
import TopOffers from "./components/TopOffers";
import Banner from "./components/Banner";
import HeroSection from "./components/HeroSection";
import Categories from "./components/Categories";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-10 justify-center w-full h-auto  px-2 sm:px-8">
      <div className="w-full relative">
        <div className="absolute z-40 top-[55%] sm:top-[50%] lg:top-[25%] left-[5%] max-w-[90%] sm:max-w-[70%] lg:max-w-[50%]">
          <p
            className="text-white drop-shadow-3xl font-bold text-3xl md:text-4xl lg:text-5xl 
       leading-snug sm:leading-tight md:leading-snug lg:leading-[3.5rem]"
          >
            Freshness You Can Trust, Savings You will Love!
          </p>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mt-4">
            <Button
              variant="default"
              size="lg"
              className="px-5 sm:px-6 py-3 sm:py-4 text-black drop-shadow-3xl text-sm sm:text-base md:text-lg"
            >
              Shop Now
            </Button>
            <Button
              variant="ghost"
              className="text-black drop-shadow-3xl text-sm sm:text-base md:text-lg"
            >
              Explore Deals
            </Button>
          </div>
        </div>
        <div>
          <HeroSection />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xl font-semibold">Categories</p>
        <Categories />
      </div>
      <div className="space-y-4">
        <p className="text-xl font-semibold">Best Sellers</p>
        <BestSellers />
      </div>
      <div className="space-y-4">
        <p className="text-xl font-semibold">Top Offers</p>
        <TopOffers />
      </div>
      <div className="md:p-4">
        <Banner />
      </div>
    </div>
  );
};
export default Home;
