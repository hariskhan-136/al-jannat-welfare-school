import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { DashboardShell } from "@/components/admin/dashboard-shell";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Middleware already blocks unauthenticated requests to this route — this is
  // a defense-in-depth check for direct server-side rendering edge cases.
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <DashboardShell adminName={session.name}>{children}</DashboardShell>;
}
