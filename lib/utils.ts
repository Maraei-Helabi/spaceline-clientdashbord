import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCookieLocale = () =>
  (document.cookie.match(/NEXT_LOCALE=([^;]+)/)?.[1] ?? "ar") as "en" | "ar";
