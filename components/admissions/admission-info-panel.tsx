import { ClipboardList, FileCheck, PhoneCall, Users } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Fill the online form",
    description: "Complete the admission form with accurate student and parent details.",
  },
  {
    icon: FileCheck,
    title: "Upload documents",
    description: "Attach a recent student photo and the birth certificate.",
  },
  {
    icon: PhoneCall,
    title: "Verification call",
    description: "Our admissions team reviews and calls you within 2–3 working days.",
  },
  {
    icon: Users,
    title: "Campus visit & confirmation",
    description: "Visit the campus, meet our staff, and confirm the seat.",
  },
];

export function AdmissionInfoPanel() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-lg font-bold text-foreground">Admission Process</h3>
        <ol className="mt-5 space-y-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 font-mono text-sm font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-3xl border border-sky-200 bg-sky-50 p-6 dark:border-sky-900 dark:bg-sky-950/30">
        <h3 className="font-display text-base font-bold text-sky-900 dark:text-sky-300">
          Documents Required
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-sky-800 dark:text-sky-300/90">
          <li>• Recent passport-size photograph of the student</li>
          <li>• Original or copy of the student's birth certificate</li>
          <li>• Previous school leaving certificate (if applicable)</li>
        </ul>
      </div>
    </div>
  );
}
