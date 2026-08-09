import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div
        className="pointer-events-none fixed inset-0 bg-star-pattern opacity-[0.04]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        <div className="mb-8 flex items-center gap-2.5">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
            <Image
              src="/images/logo.jpeg"
              alt={`${SITE.name} logo`}
              fill
              className="object-contain p-0.5"
            />
          </span>

          <span className="font-display text-lg font-bold text-white">
            {SITE.shortName}
          </span>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
