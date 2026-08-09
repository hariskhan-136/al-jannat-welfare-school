"use client";

import * as React from "react";
import { Check, Loader2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AdminClassFee {
  id: string;
  name: string;
  section: string | null;
  fee: {
    admissionFee: number;
    monthlyFee: number;
    annualCharges: number;
    securityFee: number;
  } | null;
}

type DraftFee = {
  admissionFee: number;
  monthlyFee: number;
  annualCharges: number;
  securityFee: number;
};

const FIELDS: Array<{ key: keyof DraftFee; label: string }> = [
  { key: "admissionFee", label: "Admission Fee" },
  { key: "monthlyFee", label: "Monthly Fee" },
  { key: "annualCharges", label: "Annual Charges" },
  { key: "securityFee", label: "Security Fee" },
];

export function FeeEditor({ classes }: { classes: AdminClassFee[] }) {
  const [drafts, setDrafts] = React.useState<Record<string, DraftFee>>(() =>
    Object.fromEntries(
      classes.map((c) => [
        c.id,
        c.fee ?? { admissionFee: 0, monthlyFee: 0, annualCharges: 0, securityFee: 0 },
      ])
    )
  );
  const [savingId, setSavingId] = React.useState<string | null>(null);
  const [savedId, setSavedId] = React.useState<string | null>(null);
  const [errorId, setErrorId] = React.useState<string | null>(null);

  const updateField = (classId: string, field: keyof DraftFee, value: string) => {
    const num = Number(value);
    setDrafts((prev) => ({
      ...prev,
      [classId]: { ...prev[classId], [field]: Number.isNaN(num) ? 0 : num },
    }));
  };

  const save = async (classId: string) => {
    setSavingId(classId);
    setErrorId(null);
    try {
      const res = await fetch(`/api/fees/${classId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(drafts[classId]),
      });
      if (!res.ok) throw new Error();
      setSavedId(classId);
      setTimeout(() => setSavedId((id) => (id === classId ? null : id)), 2000);
    } catch {
      setErrorId(classId);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="hidden grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] gap-4 border-b border-border bg-muted/50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid">
        <span>Class</span>
        {FIELDS.map((f) => (
          <span key={f.key}>{f.label}</span>
        ))}
        <span />
      </div>
      <div className="divide-y divide-border">
        {classes.map((cls) => {
          const draft = drafts[cls.id];
          return (
            <div
              key={cls.id}
              className="grid grid-cols-2 items-center gap-3 px-6 py-4 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] lg:gap-4"
            >
              <div className="col-span-2 lg:col-span-1">
                <p className="text-sm font-semibold text-foreground">{cls.name}</p>
                <p className="text-xs text-muted-foreground">{cls.section}</p>
              </div>
              {FIELDS.map((f) => (
                <Input
                  key={f.key}
                  type="number"
                  min={0}
                  value={draft[f.key]}
                  onChange={(e) => updateField(cls.id, f.key, e.target.value)}
                  className="h-9 font-mono text-sm"
                  aria-label={`${f.label} for ${cls.name}`}
                />
              ))}
              <Button
                size="sm"
                variant={errorId === cls.id ? "destructive" : "outline"}
                onClick={() => save(cls.id)}
                disabled={savingId === cls.id}
                className={cn("justify-self-start", savedId === cls.id && "border-emerald-500 text-emerald-600")}
              >
                {savingId === cls.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : savedId === cls.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {errorId === cls.id ? "Retry" : savedId === cls.id ? "Saved" : "Save"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
