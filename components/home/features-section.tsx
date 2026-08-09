"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MonitorSmartphone,
  BookOpenCheck,
  Laptop,
  FlaskConical,
  Library,
  Volleyball,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Qualified Teachers",
    description: "Experienced, trained educators dedicated to every student's growth.",
  },
  {
    icon: MonitorSmartphone,
    title: "Smart Classrooms",
    description: "Modern, well-ventilated classrooms equipped for interactive learning.",
  },
  {
    icon: BookOpenCheck,
    title: "Islamic Education",
    description: "Qur'an, Islamiyat, and character-building woven into daily learning.",
  },
  {
    icon: Laptop,
    title: "Computer Lab",
    description: "Hands-on IT skills and digital literacy from an early age.",
  },
  {
    icon: FlaskConical,
    title: "Science Lab",
    description: "Fully equipped labs that turn theory into hands-on discovery.",
  },
  {
    icon: Library,
    title: "Library",
    description: "A growing collection that nurtures curiosity and a love of reading.",
  },
  {
    icon: Volleyball,
    title: "Sports",
    description: "Structured sports periods for fitness, teamwork, and sportsmanship.",
  },
  {
    icon: Sparkles,
    title: "Character Building",
    description: "Discipline, etiquette, and values instilled through daily practice.",
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-muted/40">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            What We Offer
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Everything a growing student needs
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-900/40 dark:text-emerald-400">
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
