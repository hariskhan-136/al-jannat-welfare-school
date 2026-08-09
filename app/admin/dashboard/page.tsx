import Link from "next/link";
import { ClipboardList, Images, Mail, Wallet, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function DashboardOverviewPage() {
  const [admissionCount, pendingCount, unreadMessages, galleryCount, recentAdmissions] =
    await Promise.all([
      prisma.admission.count(),
      prisma.admission.count({ where: { status: "PENDING" } }),
      prisma.message.count({ where: { isRead: false } }),
      prisma.galleryItem.count(),
      prisma.admission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          studentName: true,
          classAppliedFor: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  const stats = [
    {
      label: "Total Applications",
      value: admissionCount,
      icon: ClipboardList,
      href: "/admin/dashboard/admissions",
    },
    {
      label: "Pending Review",
      value: pendingCount,
      icon: ClipboardList,
      href: "/admin/dashboard/admissions?status=PENDING",
    },
    { label: "Unread Messages", value: unreadMessages, icon: Mail, href: "/admin/dashboard" },
    { label: "Gallery Photos", value: galleryCount, icon: Images, href: "/admin/dashboard/gallery" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A quick snapshot of admissions activity and site content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-soft-lg">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <stat.icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Applications</CardTitle>
          <Link
            href="/admin/dashboard/admissions"
            className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {recentAdmissions.length === 0 ? (
            <p className="px-6 pb-6 text-sm text-muted-foreground">
              No applications submitted yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recentAdmissions.map((a) => (
                <div key={a.id} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{a.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.classAppliedFor} · {formatDate(a.createdAt)}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">
        <p className="font-semibold">Coming next</p>
        <p className="mt-1">
          Full admissions review, gallery management, fee editing, and homepage
          content editing are being added in the next delivery stage.
        </p>
      </div>
    </div>
  );
}
