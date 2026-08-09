import type { Metadata } from "next";
import { getFeeStructure } from "@/lib/data/fees";
import { FeeTable } from "@/components/fees/fee-table";
import { buildWhatsAppLink } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Fee Structure",
  description:
    "View the transparent, affordable fee structure for every class at Al Jannat Welfare School Nowshera — admission fee, monthly fee, annual charges, and security fee.",
  alternates: { canonical: "/fee-structure" },
};

export const revalidate = 3600;

export default async function FeeStructurePage() {
  const fees = await getFeeStructure();

  const sections = Array.from(new Set(fees.map((f) => f.section)));

  return (
    <div className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Fee Structure
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Transparent, affordable pricing
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
            No hidden charges. Fees are reviewed annually and shared clearly with
            every family at admission.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-10">
          {sections.map((section) => (
            <div key={section}>
              <h2 className="mb-4 font-display text-lg font-bold text-foreground">
                {section}
              </h2>
              <FeeTable fees={fees.filter((f) => f.section === section)} />
            </div>
          ))}

          <div className="flex flex-col items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-6 text-center dark:border-sky-900 dark:bg-sky-950/30 sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-sky-900 dark:text-sky-300">
              Have questions about fee payment schedules or sibling discounts?
            </p>
            <Button asChild variant="whatsapp" size="sm">
              <a href={buildWhatsAppLink(SITE.whatsapp, "I have a question about the fee structure.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
