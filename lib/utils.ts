import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts (e.g. "p-2 p-4" -> "p-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with locale-aware thousands separators.
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Format PKR currency for fee tables.
 */
export function formatPKR(value: number): string {
  return `Rs. ${formatNumber(value)}`;
}

/**
 * Format a date consistently across server and client.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Build a wa.me deep link with a prefilled message.
 */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildGoogleMapsLink(address: string): string {
  return `https://maps.app.goo.gl/BGtGC7rJ4Sp9vHoE9${encodeURIComponent(address)}`;
}
