"use client";

import { motion } from "framer-motion";
import { formatPKR } from "@/lib/utils";
import type { ClassFeeData } from "@/lib/data/fees";

export function FeeTable({ fees }: { fees: ClassFeeData[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card shadow-soft">
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-3xl md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 font-display font-bold text-foreground">Class</th>
              <th className="px-6 py-4 font-display font-bold text-foreground">Admission Fee</th>
              <th className="px-6 py-4 font-display font-bold text-foreground">Monthly Fee</th>
              <th className="px-6 py-4 font-display font-bold text-foreground">Annual Charges</th>
              <th className="px-6 py-4 font-display font-bold text-foreground">Security Fee</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, i) => (
              <motion.tr
                key={fee.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 8) * 0.03 }}
                className="border-b border-border last:border-0 hover:bg-muted/30"
              >
                <td className="px-6 py-4 font-semibold text-foreground">{fee.className}</td>
                <td className="px-6 py-4 font-mono text-foreground/80">
                  {formatPKR(fee.admissionFee)}
                </td>
                <td className="px-6 py-4 font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                  {formatPKR(fee.monthlyFee)}
                </td>
                <td className="px-6 py-4 font-mono text-foreground/80">
                  {formatPKR(fee.annualCharges)}
                </td>
                <td className="px-6 py-4 font-mono text-foreground/80">
                  {formatPKR(fee.securityFee)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-border md:hidden">
        {fees.map((fee) => (
          <div key={fee.id} className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">{fee.className}</h3>
              <span className="rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                {formatPKR(fee.monthlyFee)}/mo
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
              <dt>Admission Fee</dt>
              <dd className="text-right font-mono text-foreground/80">
                {formatPKR(fee.admissionFee)}
              </dd>
              <dt>Annual Charges</dt>
              <dd className="text-right font-mono text-foreground/80">
                {formatPKR(fee.annualCharges)}
              </dd>
              <dt>Security Fee</dt>
              <dd className="text-right font-mono text-foreground/80">
                {formatPKR(fee.securityFee)}
              </dd>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
