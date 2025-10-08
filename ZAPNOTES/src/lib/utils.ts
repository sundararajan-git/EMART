import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";
import type { ErrorToastType } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showErrorToast = (err: ErrorToastType) => {
  console.error(err);
  if (typeof err === "object" && err !== null && "response" in err) {
    const errorWithResponse = err as {
      response?: { data?: { message?: string } };
    };
    if (errorWithResponse.response?.data?.message) {
      toast.error(err?.response?.data?.message || "Something went wrong !");
    } else {
      toast.error("An unexpected error occurred.");
    }
  } else if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error(String(err));
  }
};
