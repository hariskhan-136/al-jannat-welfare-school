import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Al Jannat Welfare School Nowshera — quality education rooted in strong character.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
