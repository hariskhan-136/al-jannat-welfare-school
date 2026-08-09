"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import type { AdmissionRecord, AdmissionStatus } from "@/types";

const STATUS_STYLES: Record<AdmissionStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  REVIEWING: "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  ACCEPTED: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  REJECTED: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const FILTERS: Array<AdmissionStatus | "ALL"> = ["ALL", "PENDING", "REVIEWING", "ACCEPTED", "REJECTED"];

export function AdmissionsTable({ initialData }: { initialData: AdmissionRecord[] }) {
  const [admissions, setAdmissions] = React.useState(initialData);
  const [filter, setFilter] = React.useState<AdmissionStatus | "ALL">("ALL");
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  const filtered =
    filter === "ALL" ? admissions : admissions.filter((a) => a.status === filter);

  const updateStatus = async (id: string, status: AdmissionStatus) => {
    setUpdatingId(id);
    const previous = admissions;
    setAdmissions((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      setAdmissions(previous); // revert on failure
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={filter} onValueChange={(v) => setFilter(v as AdmissionStatus | "ALL")}>
        <TabsList>
          {FILTERS.map((f) => (
            <TabsTrigger key={f} value={f}>
              {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card py-16 text-center text-sm text-muted-foreground">
          No applications in this category.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 border-b border-border bg-muted/50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid">
            <span>Student</span>
            <span>Class</span>
            <span>Parent Contact</span>
            <span>Submitted</span>
            <span>Documents</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: (i % 10) * 0.02 }}
                className="grid grid-cols-1 gap-3 px-6 py-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-4"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{a.studentName}</p>
                  <p className="text-xs text-muted-foreground">
                    Father: {a.fatherName} · {a.gender === "MALE" ? "Male" : "Female"}
                  </p>
                </div>
                <span className="text-sm text-foreground/80">{a.classAppliedFor}</span>
                <div className="text-xs text-foreground/80">
                  <p>{a.parentPhone}</p>
                  <p className="truncate">{a.parentEmail}</p>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(a.createdAt)}</span>
                <div className="flex gap-3 text-xs">
                  {a.studentPhotoUrl && (
                    <a
                      href={a.studentPhotoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      Photo <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {a.birthCertUrl && (
                    <a
                      href={a.birthCertUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-medium text-sky-700 hover:underline dark:text-sky-400"
                    >
                      Certificate <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {updatingId === a.id && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  )}
                  <Select
                    value={a.status}
                    onValueChange={(v) => updateStatus(a.id, v as AdmissionStatus)}
                  >
                    <SelectTrigger
                      className={`h-8 w-36 border-0 text-xs font-semibold ${STATUS_STYLES[a.status]}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="REVIEWING">Reviewing</SelectItem>
                      <SelectItem value="ACCEPTED">Accepted</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
