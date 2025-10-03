"use client";
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const products = [
  "Fresh Vegetables",
  "Fruits",
  "Snacks",
  "Beverages",
  "Organic Items",
  "Meat & Fish",
  "Dairy Products",
  "Bread & Bakery",
  "Rice & Grains",
  "Spices & Masalas",
];

export function GrocerySearch() {
  const [value, setValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md mx-auto hidden sm:block">
      <Command className="w-full bg-accent shadow-none">
        <CommandInput
          placeholder="Search products..."
          value={value}
          onValueChange={setValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="h-10 w-full rounded-md border-none shadow-none px-3"
        />

        {isFocused && filteredProducts.length > 0 && (
          <CommandGroup className="absolute top-full mt-1 w-full bg-background  rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {filteredProducts.map((product, index) => (
              <CommandItem
                key={index}
                value={product}
                onSelect={(val) => setValue(val)}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              >
                {product}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {isFocused && filteredProducts.length === 0 && (
          <CommandEmpty className="absolute top-full mt-1 w-full bg-background rounded-md shadow-lg px-3 py-2 z-50 text-sm">
            No products found.
          </CommandEmpty>
        )}
      </Command>
    </div>
  );
}
