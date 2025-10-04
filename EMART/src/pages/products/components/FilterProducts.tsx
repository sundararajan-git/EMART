// import { useState } from "react";
// import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { FiFilter } from "react-icons/fi";

// const FilterProducts = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <Drawer open={open} onOpenChange={setOpen} direction="left">
//       <DrawerTrigger asChild>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="hover:bg-transparent hover:text-foreground cursor-pointer dark:hover:bg-transparent"
//         >
//           <FiFilter className="size-5" />
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent className="bg-transparent border-none shadow-none p-0">
//         <div className="mx-2 my-2 h-[calc(100%-1em)] rounded-lg bg-background  shadow-2xl border-none p-1 ">
//           <div className="flex flex-col items-center overflow-auto h-full p-2">
//             {Array.from({ length: 10 }).map((_, index) => {
//               return (
//                 <p key={index}>
//                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut,
//                   doloremque aspernatur ullam consequatur reprehenderit animi
//                   dolore quisquam. Laborum ex iste ullam, deleniti tempore nam,
//                   a accusantium molestiae libero, quidem est?
//                 </p>
//               );
//             })}
//           </div>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default FilterProducts;
"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FiFilter } from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Slider,
  //   SliderTrack,
  //   SliderRange,
  //   SliderThumb,
} from "@/components/ui/slider";

const categories = [
  "Vegetables",
  "Fruits",
  "Snacks",
  "Beverages",
  "Dairy",
  "Meat",
];
const brands = ["Brand A", "Brand B", "Brand C", "Organic Farms"];
const units = ["500g", "1kg", "2kg", "5kg"];

const FilterProducts = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState([0, 500]);

  const toggleSelection = (value: string, state: string[], setState: any) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent hover:text-foreground cursor-pointer dark:hover:bg-transparent"
        >
          <FiFilter className="size-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-transparent border-none shadow-none p-0">
        <div className="mx-2 my-2 h-[calc(100%-1em)] rounded-lg bg-background shadow-2xl p-4">
          <div className="flex flex-col h-full overflow-auto space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Category</h3>
              <div className="flex flex-col space-y-1">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={() =>
                        toggleSelection(
                          cat,
                          selectedCategories,
                          setSelectedCategories
                        )
                      }
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-semibold mb-2">Brand</h3>
              <div className="flex flex-col space-y-1">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() =>
                        toggleSelection(
                          brand,
                          selectedBrands,
                          setSelectedBrands
                        )
                      }
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="">
              <h3 className="font-semibold mb-2">Price (₹)</h3>
              <Slider
                defaultValue={[33]}
                max={1000}
                step={10}
                value={price}
                onValueChange={setPrice}
                className="w-full"
              />
              <div className="flex justify-between text-sm mt-1">
                <span>₹{price[0]}</span>
                <span>₹{price[1]}</span>
              </div>
            </div>

            {/* Units */}
            <div>
              <h3 className="font-semibold mb-2">Unit</h3>
              <div className="flex flex-wrap gap-2">
                {units.map((unit) => (
                  <Button
                    key={unit}
                    variant={unit === "500g" ? "outline" : "ghost"} // example default selected
                    size="sm"
                  >
                    {unit}
                  </Button>
                ))}
              </div>
            </div>

            {/* Apply Filters */}
            <Button className="mt-auto w-full text-black">Apply Filters</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterProducts;
