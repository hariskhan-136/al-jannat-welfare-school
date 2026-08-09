"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div
        className="pointer-events-none absolute inset-0 bg-star-pattern opacity-[0.05] dark:opacity-[0.08]"
        aria-hidden="true"
      />
      <div className="container relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Admissions open for the new academic session
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl"
          >
            {SITE.name}
            <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
              Nurturing Character. Building Futures.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            From Playgroup to Middle, we combine a modern academic curriculum with strong
            Islamic values and disciplined character-building — so every child in{" "}
            {SITE.location.split(",")[0]} grows into a confident, capable, and principled
            individual.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <Link href="/admissions">
                Apply Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a
                href={buildWhatsAppLink(SITE.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-soft-lg">
            <Image
              src="/images/hero-campus.jpg"
              alt="Students and teachers at Al Jannat Welfare School Nowshera campus"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-soft-lg sm:block">
            <p className="font-mono text-2xl font-bold text-emerald-600">9+</p>
            <p className="text-xs font-medium text-muted-foreground">
              Years of Excellence
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
