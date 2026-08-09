"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Images,
  Wallet,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Admissions", href: "/admin/dashboard/admissions", icon: ClipboardList },
  { label: "Gallery", href: "/admin/dashboard/gallery", icon: Images },
  { label: "Fee Structure", href: "/admin/dashboard/fees", icon: Wallet },
  { label: "Site Content", href: "/admin/dashboard/content", icon: FileText },
];

export function AdminSidebar({ forceVisible = false }: { forceVisible?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-900",
        forceVisible ? "flex h-full" : "hidden lg:flex"
      )}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-800 px-6">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
          <Image
            src="/images/logo.jpeg"
            alt="Al Jannat Welfare School logo"
            fill
            className="object-contain p-0.5"
          />
        </span>
        <span className="font-display text-sm font-bold text-white">Admin Panel</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View Live Site
        </Link>
      </div>
    </aside>
  );
}
