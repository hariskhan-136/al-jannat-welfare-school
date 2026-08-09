import type { Metadata } from "next";
import { AdmissionForm } from "@/components/admissions/admission-form";
import { AdmissionInfoPanel } from "@/components/admissions/admission-info-panel";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Apply online for admission at Al Jannat Welfare School Nowshera. Fill the form, upload required documents, and our admissions team will contact you within 2–3 working days.",
  alternates: { canonical: "/admissions" },
};

export default function AdmissionsPage() {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Admissions {new Date().getFullYear()}
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Start your child's application
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
            Seats are open for Playgroup through Class 10. Complete the form below —
            it takes about five minutes — and our admissions team will take it from
            there.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <AdmissionForm />
          <AdmissionInfoPanel />
        </div>
      </div>
    </div>
  );
}
