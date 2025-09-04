import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { slugify } from "@/utils/slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatForUrl = (text: string): string => {
  return slugify(text);
};

export const getDetailsUrl = (
  locale: string,
  manufacturerName: string | undefined,
  modelName: string | undefined,
  year: string | number | undefined,
  vin: string | undefined
): string => {
  return `/${locale}/salvage-auto-auction/${formatForUrl(
    manufacturerName || "brand"
  )}/${formatForUrl(modelName || "model")}/${year || "year"}/${vin || "vin"}`;
};

// Helper function to convert locale to full OpenGraph locale format
export const getOpenGraphLocale = (locale: string): string => {
  const localeMap: Record<string, string> = {
    en: "en_US",
    bg: "bg_BG",
  };
  return localeMap[locale] || "en_US";
};

// Helper function to get site name based on domain
export const getSiteName = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    if (hostname === "bidatlanticcars.com") {
      return "Bid Atlantic Cars";
    } else if (hostname === "atlanticcars.bg") {
      return "Atlantic Cars BG";
    } else if (hostname === "atlanticcars.us") {
      return "Atlantic Cars US";
    }
  }

  // Default fallback
  return "Bid Atlantic Cars";
};
