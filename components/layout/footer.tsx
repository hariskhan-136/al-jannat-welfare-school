import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, MessageCircle } from "lucide-react";

import { SITE, FOOTER_LINKS } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-slate-900 text-slate-300 dark:bg-slate-950">
      <div
        className="pointer-events-none absolute inset-0 bg-star-pattern opacity-[0.04]"
        aria-hidden="true"
      />

      <div className="container relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* School */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
              <Image
                src="/images/logo.jpeg"
                alt={`${SITE.name} logo`}
                fill
                sizes="40px"
                className="object-contain p-0.5"
              />
            </span>

            <span className="font-display text-lg font-bold text-white">
              {SITE.shortName}
            </span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {SITE.tagline} A trusted institution serving the families of Nowshera with
            quality education rooted in strong character.
          </p>

          <div className="mt-5 flex gap-3">
            {/* Facebook */}
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Al Jannat Welfare School on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-emerald-600 hover:text-white"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>

            {/* WhatsApp */}
            <a
              href={buildWhatsAppLink(SITE.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Al Jannat Welfare School on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-emerald-600 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-3 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-emerald-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
            Contact
          </h3>

          <ul className="mt-4 space-y-4 text-sm">
            {/* Address */}
            <li className="flex gap-2.5">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                aria-hidden="true"
              />

              <a
                href={SITE.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed transition-colors hover:text-emerald-400"
              >
                {SITE.address}
              </a>
            </li>

            {/* Phone Numbers */}
            <li className="flex gap-2.5">
              <Phone
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-1">
                {SITE.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-emerald-400"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </li>

            {/* Email */}
            <li className="flex gap-2.5">
              <Mail
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                aria-hidden="true"
              />

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all transition-colors hover:text-emerald-400"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Office Timing */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
            Office Timing
          </h3>

          <dl className="mt-4 space-y-2 text-sm">
            {SITE.officeTimings.map((slot) => (
              <div key={slot.days} className="flex justify-between gap-3">
                <dt className="text-slate-400">{slot.days}</dt>

                <dd className="text-right font-medium text-slate-200">{slot.hours}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/admissions"
            className="mt-5 inline-flex items-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            Apply for Admission
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10 py-6">
        <p className="container text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
