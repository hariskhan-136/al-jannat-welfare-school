"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Save } from "lucide-react";
import { statsContentSchema, type StatsContentValues } from "@/lib/validations/content";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FIELDS: Array<{ key: keyof StatsContentValues; label: string; hint: string }> = [
  { key: "students", label: "Students Enrolled", hint: "Shown on the homepage counter" },
  { key: "teachers", label: "Qualified Teachers", hint: "Shown on the homepage counter" },
  { key: "classrooms", label: "Modern Classrooms", hint: "Shown on the homepage counter" },
  { key: "yearsOfExcellence", label: "Years of Excellence", hint: "Shown on the homepage counter" },
];

export function StatsEditor({ initialStats }: { initialStats: StatsContentValues }) {
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StatsContentValues>({
    resolver: zodResolver(statsContentSchema),
    defaultValues: initialStats,
  });

  const onSubmit = async (values: StatsContentValues) => {
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/content/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Could not save changes. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
    >
      <h2 className="font-display text-base font-bold text-foreground">Homepage Statistics</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        These numbers power the animated counters on the homepage.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              type="number"
              min={0}
              invalid={!!errors[field.key]}
              className="mt-2"
              {...register(field.key, { valueAsNumber: true })}
            />
            <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p>
            {errors[field.key] && (
              <p className="mt-1 text-xs font-medium text-red-600">{errors[field.key]?.message}</p>
            )}
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="mt-6">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Saving...
          </>
        ) : saved ? (
          <>
            <Check className="h-4 w-4" /> Saved
          </>
        ) : (
          <>
            <Save className="h-4 w-4" /> Save Changes
          </>
        )}
      </Button>
    </form>
  );
}
