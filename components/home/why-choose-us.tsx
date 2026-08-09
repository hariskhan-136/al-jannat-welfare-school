"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const REASONS = [
  "Affordable, transparent fee structure for every family",
  "Low student-to-teacher ratio for personalized attention",
  "Safe, secure, and well-maintained campus",
  "Strong track record in board examination results",
  "Regular parent-teacher engagement and progress updates",
  "Balanced focus on academics, sports, and Islamic values",
];

export function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-soft-lg"
        >
          <Image
            src="/images/classroom.jpg"
            alt="Students engaged in a classroom activity at Al Jannat Welfare School"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Why Families Choose Us
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            A school that treats every child like family
          </h2>
          <ul className="mt-8 space-y-4">
            {REASONS.map((reason, i) => (
              <motion.li
                key={reason}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {reason}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
