import type { Metadata } from "next";
import Image from "next/image";
import { AboutSection } from "@/components/home/about-section";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Al Jannat Welfare School Nowshera — our story, leadership, mission, vision, and the values that shape every classroom.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <section className="section-padding pb-0">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
              About Us
            </p>
            <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
              A school built for {SITE.location.split(",")[0]}'s families
            </h1>
            <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
              For over 9 years, Al Jannat Welfare School has grown from a single classroom
              to a full campus serving hundreds of students — without ever losing sight of
              what a good education is actually for.
            </p>
          </div>
        </div>
      </section>

      <AboutSection />

      <section className="section-padding pt-0">
        <div className="container">
          <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 shadow-soft lg:grid-cols-[280px_1fr] lg:items-center lg:p-10">
            <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl border border-border shadow-soft lg:w-full">
              <Image
                src="/images/deputy-director.png"
                alt="Deputy Director of Al Jannat Welfare School Nowshera"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Deputy Director&apos;s Message
              </p>

              <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
                Welcome to Al Jannat Welfare School
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>Dear Parents, Students, and Visitors,</p>

                <p>
                  It is my pleasure to welcome you to Al Jannat Welfare School. Our
                  mission is not only to provide quality education but also to build
                  strong character, confidence, discipline, and moral values in every
                  child.
                </p>

                <p>
                  We believe that every student has unique potential. With the support of
                  dedicated teachers, caring parents, and a positive learning environment,
                  we strive to help each child achieve academic excellence while becoming
                  a responsible and compassionate member of society.
                </p>

                <p>
                  At Al Jannat Welfare School, we are committed to creating a safe,
                  respectful, and inspiring atmosphere where students are encouraged to
                  learn, grow, and dream big. Our goal is to prepare them not only for
                  examinations but for the challenges and opportunities of life.
                </p>

                <p>
                  Thank you for your trust and confidence in our institution. Together,
                  let us build a brighter future for our children and contribute to a
                  better society.
                </p>

                <p>With best wishes,</p>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-foreground">Danish Hakeem</p>
                <p className="text-sm text-muted-foreground">Deputy Director</p>
                <p className="text-sm text-muted-foreground">{SITE.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
