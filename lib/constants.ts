import { buildGoogleMapsLink } from "@/lib/utils";

// TODO: replace with the exact address the client wants displayed — this
// string also generates the "open in Google Maps" link below, so keep it
// precise (street, area, city) for an accurate map result.
const ADDRESS = "Mohallah Raheem Abad Badrashi, Near Umar Hayat Quarters";

export const SITE = {
  name: "Al Jannat Welfare School",
  shortName: "Al Jannat Welfare School",
  tagline: "Nurturing Character. Building Futures.",
  location: "Nowshera, Khyber Pakhtunkhwa, Pakistan",
  address: ADDRESS,
  mapsLink:
    "https://www.google.com/maps/dir//Al+Jannat+Welfare+School,+Mohallah+Raheem+Abad+Badrashi,+Nowshera,+24100,+Pakistan/@31.4825707,74.3235535,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x38ded3e13129d87f:0xa48894da8fd0bfb9!2m2!1d72.0019196!2d33.9864503?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D",
  phones: ["0335 5527309", "0304 9991535"],
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923355527309",
  email: "aljannatwelfareschool@gmail.com",
  officeTimings: [
    { days: "Monday – Thursday", hours: "7:30 AM – 3:00 PM" },
    { days: "Friday", hours: "7:30 AM – 12:30 PM" },
    { days: "Saturday & Sunday", hours: "Closed" },
  ],
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/aljannatwelfareschool",
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
    "https://www.google.com/maps?q=Al%20Jannat%20Welfare%20School%20Nowshera&output=embed",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Academics", href: "/academics" },
  { label: "Fee Structure", href: "/fee-structure" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Academics", href: "/academics" },
  { label: "Fee Structure", href: "/fee-structure" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;
