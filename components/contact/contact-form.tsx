"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Failed to send message.");
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
          Message sent!
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Thank you for reaching out. Our office will get back to you within one
          working day.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Message
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
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            invalid={!!errors.name}
            className="mt-2"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            invalid={!!errors.email}
            className="mt-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="03001234567"
            invalid={!!errors.phone}
            className="mt-2"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subject">Subject (optional)</Label>
          <Input
            id="subject"
            placeholder="e.g. Admission Inquiry"
            className="mt-2"
            {...register("subject")}
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="How can we help?"
            invalid={!!errors.message}
            className="mt-2 min-h-36"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.message.message}</p>
          )}
        </div>
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
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
