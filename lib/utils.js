import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export const parseServerResponse = (response) => {
  return JSON.parse(JSON.stringify(response))
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  if (!date) return ""
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0") // getMonth() returns 0-11
  const year = date.getFullYear()
  return `${day} - ${month} - ${year}`
}