import type { Metadata } from "next";
import { getAcademicsData } from "@/lib/data/academics";
import { AcademicsTabs } from "@/components/academics/academics-tabs";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore classes, subjects, and downloadable syllabuses at Al Jannat Welfare School Nowshera — from Playgroup through Matric.",
  alternates: { canonical: "/academics" },
};

// Fee/subject data changes occasionally via the admin dashboard — revalidate hourly.
export const revalidate = 3600;

export default async function AcademicsPage() {
  const sections = await getAcademicsData();

  return (
    <div className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Academics
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Classes, subjects, and syllabus
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
            A structured curriculum from Pre-Primary through Matric, built to
            balance strong fundamentals with age-appropriate depth.
          </p>
        </div>

        <div className="mt-14">
          <AcademicsTabs sections={sections} />
        </div>
      </div>
    </div>
  );
}
