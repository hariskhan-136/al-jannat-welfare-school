import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfoPanel } from "@/components/contact/contact-info-panel";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Al Jannat Welfare School Nowshera. Find our address, phone, email, office timing, and send us a message directly.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Contact Us
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            We'd love to hear from you
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
            Questions about admissions, fees, or anything else — reach out and our
            office will respond within one working day.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <ContactForm />
          <ContactInfoPanel />
        </div>
      </div>
    </div>
  );
}
