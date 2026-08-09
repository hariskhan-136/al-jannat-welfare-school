import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about-section";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturesSection } from "@/components/home/features-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CtaSection } from "@/components/home/cta-section";
import { getHomepageStats } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Al Jannat Welfare School Nowshera — modern academics, Islamic values, and character building from Playgroup to Matric. Admissions now open.",
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

export default async function HomePage() {
  const stats = await getHomepageStats();

  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection stats={stats} />
      <FeaturesSection />
      <WhyChooseUs />
      <CtaSection />
    </>
  );
}
