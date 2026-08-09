"use client";

import { motion } from "framer-motion";
import { Target, Eye, HeartHandshake } from "lucide-react";

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To deliver a balanced education that develops academic excellence, moral character, and practical life skills — preparing every student to serve their family, community, and nation with integrity.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To be the most trusted school in Nowshera — recognized for producing confident, principled graduates who lead with knowledge and compassion in a rapidly changing world.",
  },
  {
    icon: HeartHandshake,
    title: "Core Values",
    body: "Discipline, honesty, respect, and a deep commitment to Islamic ethics — woven into every lesson, every interaction, and every corner of our campus culture.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
            About Al Jannat Welfare School
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            Education built on character, not shortcuts
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
            Founded to serve the families of Nowshera, we've spent over 9 years building a
            school where academic rigor and moral grounding grow side by side — not in
            competition with each other.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-soft-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                <pillar.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
