"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function AdminTopbar({
  adminName,
  onMenuClick,
}: {
  adminName: string;
  onMenuClick?: () => void;
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const initials = adminName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
        <p className="text-sm font-semibold text-foreground">Dashboard</p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
            {initials || "AD"}
          </span>
          <span className="hidden text-sm font-medium text-foreground sm:inline">
            {adminName}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} disabled={loggingOut}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          {loggingOut ? "Signing out..." : "Logout"}
        </Button>
      </div>
    </header>
  );
}
