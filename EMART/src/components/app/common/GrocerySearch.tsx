"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import axiosInstance from "@/lib/axios/axios";
import { showErrorToast } from "@/lib/utils";
import { upQueries } from "@/store/slices/searchQueries";
import type { RootState } from "@/store/store";
import type { ErrorToastType } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export function GrocerySearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispath = useDispatch();
  const searchQueries = useSelector((state: RootState) => state.searchQueries);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredProducts = useMemo(() => {
    return searchQueries.filter((product) =>
      product.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchQueries]);

  const getProductList = async () => {
    try {
      const { data } = await axiosInstance.get(`/emart/product-lists`);
      switch (data.status) {
        case "FETCHED":
          dispath(upQueries({ value: data.productsList.productSearchQuery }));
          break;
        default:
          console.warn("Unhandled status:", data.status);
      }
    } catch (err) {
      showErrorToast(err as ErrorToastType);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    if (location.pathname.split("/")[1] !== "search") setQuery("");
  }, [navigate]);

  const searchHandler = async (query: string) => {
    setQuery(query.trim());
    if (query.trim()) {
      setIsFocused(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto hidden sm:block">
      <Command className="w-full bg-accent shadow-none">
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHandler(query);
            }
          }}
          className="h-10 w-full rounded-md border-none shadow-none px-3"
        />

        {isFocused && filteredProducts.length > 0 && (
          <CommandGroup className="absolute top-full mt-1 w-full bg-background  rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {filteredProducts.map((product, index) => (
              <CommandItem
                key={index}
                value={product}
                onMouseDown={() => {
                  searchHandler(product);
                }}
                className="cursor-pointer px-3 py-2 dark:data-[selected=true]:bg-gray-900 :data-[selected=true]:bg-gray-200"
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
