"use client";

import { Users, GraduationCap, DoorOpen, Trophy, type LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { formatNumber } from "@/lib/utils";
import type { StatsContentValues } from "@/lib/validations/content";

interface StatDefinition {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix: string;
}

function StatCard({ icon: Icon, label, value, suffix }: StatDefinition) {
  const { ref, value: count } = useCountUp(value);
  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
    >
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 font-mono text-3xl font-bold text-white sm:text-4xl">
        {formatNumber(count)}
        {suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-300">{label}</p>
    </div>
  );
}

// Stats come from the admin-editable "stats" content block (see lib/data/site-content.ts).
export function StatsSection({ stats }: { stats: StatsContentValues }) {
  const items: StatDefinition[] = [
    { icon: Users, label: "Students Enrolled", value: stats.students, suffix: "+" },
    { icon: GraduationCap, label: "Qualified Teachers", value: stats.teachers, suffix: "+" },
    { icon: DoorOpen, label: "Modern Classrooms", value: stats.classrooms, suffix: "" },
    { icon: Trophy, label: "Years of Excellence", value: stats.yearsOfExcellence, suffix: "+" },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-20 dark:bg-slate-950">
      <div
        className="pointer-events-none absolute inset-0 bg-star-pattern opacity-[0.05]"
        aria-hidden="true"
      />
      <div className="container relative grid grid-cols-2 gap-5 lg:grid-cols-4">
        {items.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
