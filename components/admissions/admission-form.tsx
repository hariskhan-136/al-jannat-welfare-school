"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  admissionFormSchema,
  CLASS_OPTIONS,
  type AdmissionFormValues,
} from "@/lib/validations/admission";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FileUploadField } from "@/components/admissions/file-upload-field";
import { cn } from "@/lib/utils";

type FieldConfig = {
  name: "studentName" | "fatherName" | "motherName" | "parentPhone" | "parentEmail";
  label: string;
  placeholder: string;
  type?: string;
};

const TEXT_FIELDS: FieldConfig[] = [
  { name: "studentName", label: "Student Name", placeholder: "e.g. Ahmad Ali" },
  { name: "fatherName", label: "Father's Name", placeholder: "e.g. Muhammad Ali" },
  { name: "motherName", label: "Mother's Name", placeholder: "e.g. Ayesha Ali" },
  { name: "parentPhone", label: "Parent Phone", placeholder: "03001234567", type: "tel" },
  {
    name: "parentEmail",
    label: "Parent Email",
    placeholder: "parent@example.com",
    type: "email",
  },
];

export function AdmissionForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionFormSchema),
  });

  const onSubmit = async (values: AdmissionFormValues) => {
    setServerError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("studentName", values.studentName);
      formData.append("fatherName", values.fatherName);
      formData.append("motherName", values.motherName);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("gender", values.gender);
      formData.append("classAppliedFor", values.classAppliedFor);
      formData.append("parentPhone", values.parentPhone);
      formData.append("parentEmail", values.parentEmail);
      formData.append("address", values.address);
      formData.append("studentPhoto", values.studentPhoto);
      formData.append("birthCertificate", values.birthCertificate);

      const res = await fetch("/api/admissions", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Submission failed. Please try again.");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center dark:border-emerald-800 dark:bg-emerald-900/20"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-foreground">
          Application submitted successfully!
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Thank you for applying to Al Jannat Welfare School. A confirmation email is on
          its way, and our admissions team will contact you within 2–3 working days.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Submit Another Application
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-soft-lg sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {TEXT_FIELDS.map((field) => (
          <div key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              invalid={!!errors[field.name]}
              className="mt-2"
              {...register(field.name)}
            />
            {errors[field.name] && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            invalid={!!errors.dateOfBirth}
            className="mt-2"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="gender" invalid={!!errors.gender} className="mt-2">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="classAppliedFor">Class Applying For</Label>
          <Controller
            control={control}
            name="classAppliedFor"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="classAppliedFor"
                  invalid={!!errors.classAppliedFor}
                  className="mt-2"
                >
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {CLASS_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.classAppliedFor && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.classAppliedFor.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="House #, Street, Area, Nowshera"
            invalid={!!errors.address}
            className="mt-2"
            {...register("address")}
          />
          {errors.address && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.address.message}</p>
          )}
        </div>

        <Controller
          control={control}
          name="studentPhoto"
          render={({ field }) => (
            <FileUploadField
              id="studentPhoto"
              label="Student Photo"
              hint="JPG, PNG, or WEBP — max 5MB"
              accept="image/jpeg,image/png,image/webp"
              error={errors.studentPhoto?.message as string | undefined}
              onFileSelect={(file) => field.onChange(file)}
            />
          )}
        />

        <Controller
          control={control}
          name="birthCertificate"
          render={({ field }) => (
            <FileUploadField
              id="birthCertificate"
              label="Birth Certificate"
              hint="JPG, PNG, or PDF — max 5MB"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              error={errors.birthCertificate?.message as string | undefined}
              onFileSelect={(file) => field.onChange(file)}
            />
          )}
        />
      </div>

      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700",
              "dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
            )}
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <Button type="submit" size="lg" disabled={submitting} className="mt-8 w-full sm:w-auto">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" /> Submit Application
          </>
        )}
      </Button>
    </form>
  );
}
