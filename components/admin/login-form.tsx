"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, LogIn, Lock } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/validations/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Login failed.");
      }
      const redirectTo = searchParams.get("from") || "/admin/dashboard";
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-soft-lg"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
        <Lock className="h-5 w-5" aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-display text-xl font-bold text-foreground">Admin Login</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to manage admissions, gallery, fees, and site content.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@aljannatschool.edu.pk"
            invalid={!!errors.email}
            className="mt-2"
            autoComplete="username"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            invalid={!!errors.password}
            className="mt-2"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.password.message}</p>
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

      <Button type="submit" disabled={submitting} className="mt-7 w-full">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Signing in...
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" aria-hidden="true" /> Sign In
          </>
        )}
      </Button>
    </form>
  );
}
