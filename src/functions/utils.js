import { clsx } from "clsx";
// You can use a simpler `tw-merge` library or utility if `tailwind-variants` is causing issues.
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
