import { BiLeaf } from "react-icons/bi";
import { LuTruck } from "react-icons/lu";
import { RiBitCoinLine, RiHeartAddLine } from "react-icons/ri";

const Banner = () => {
  const features = [
    {
      icon: <LuTruck className="size-4 sm:size-5 md:size-6 text-white" />,
      title: "Fastest Delivery",
      desc: "Groceries delivered in under 30 minutes.",
    },
    {
      icon: <BiLeaf className="size-4 sm:size-5 md:size-6 text-white" />,
      title: "Freshness Guaranteed",
      desc: "Fresh produce straight from the source.",
    },
    {
      icon: <RiBitCoinLine className="size-4 sm:size-5 md:size-6 text-white" />,
      title: "Affordable Prices",
      desc: "Quality groceries at unbeatable prices.",
    },
    {
      icon: (
        <RiHeartAddLine className="size-4 sm:size-5 md:size-6 text-white" />
      ),
      title: "Trusted by Thousands",
      desc: "Loved by 10,000+ happy customers.",
    },
  ];

  return (
    <div className="w-full relative mt-4">
      <picture>
        <source
          srcSet="https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759478762/bottom_banner_kvwzl3.png"
          media="(min-width: 768px)"
        />
        <img
          src="https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759478762/bottom_banner1_h3zthi.png"
          alt="banner"
          className="w-full h-auto object-cover object-[0px_-100px] sm:object-[0px_-150px] md:object-[0px_0px]"
        />
      </picture>

      <div className="absolute inset-0 flex flex-col md:flex-row">
        <div className="w-full flex flex-col items-center mt-8 sm:mt-24 md:mt-0 md:mr-12 lg:mr-24 md:items-end justify-center px-4 sm:px-8 lg:px-16 py-6 ">
          <p className="text-sm md:text-lg lg:text-2xl font-semibold text-primary mb-3 sm:mb-4">
            Why We Are the Best?
          </p>

          <div className="flex flex-col gap-2 sm:gap-3">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 sm:gap-3 text-black dark:text-white"
              >
                <div className="flex items-center justify-center p-1 lg:p-3 rounded-sm bg-primary">
                  {item.icon}
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="font-medium text-xs sm:text-sm lg:text-lg">
                    {item.title}
                  </p>
                  <p className="text-[10px] sm:text-xs lg:text-sm opacity-80">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
