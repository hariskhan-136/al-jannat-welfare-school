import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 to-sky-600 px-6 py-16 text-center shadow-soft-lg sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 bg-star-pattern opacity-10"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-extrabold text-white sm:text-4xl">
              Ready to give your child a strong foundation?
            </h2>
            <p className="mt-4 text-balance text-emerald-50/90">
              Seats for the new academic session are filling quickly. Start your
              child's application today — our admissions team is here to help every
              step of the way.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
                <Link href="/admissions">
                  Apply Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
              >
                <Link href="/contact">Talk to Admissions</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
