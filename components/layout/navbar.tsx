"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn, buildWhatsAppLink } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  React.useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 shadow-soft backdrop-blur-lg"
          : "border-b border-transparent bg-background/50 backdrop-blur-sm"
      )}
    >
      <nav
        aria-label="Primary"
        className="container flex h-[4.5rem] items-center justify-between py-3"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${SITE.name} — Home`}
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-glow">
            <Image
              src="/images/school-logo.jpeg"
              alt={`${SITE.name} logo`}
              fill
              className="object-cover"
              priority
              sizes="44px"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold text-foreground sm:text-lg">
              {SITE.shortName}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              Nowshera
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-emerald-600"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button asChild variant="whatsapp" size="sm">
            <a
              href={buildWhatsAppLink(
                SITE.whatsapp,
                "Assalam-o-Alaikum, I have a question about Al Jannat Welfare School."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/admissions">Apply Now</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium",
                      pathname === link.href
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex gap-2 px-4">
                <Button asChild variant="whatsapp" size="sm" className="flex-1">
                  <a
                    href={buildWhatsAppLink(SITE.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link href="/admissions">Apply Now</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
