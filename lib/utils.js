import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export const parseServerResponse = (response) => {
  return JSON.parse(JSON.stringify(response))
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
