import { prisma } from "@/lib/prisma";
import { FeeEditor, type AdminClassFee } from "@/components/admin/fees/fee-editor";

export default async function AdminFeesPage() {
  const classes = await prisma.schoolClass.findMany({
    orderBy: { level: "asc" },
    include: { fee: true },
  });

  const data: AdminClassFee[] = classes.map((c) => ({
    id: c.id,
    name: c.name,
    section: c.section,
    fee: c.fee
      ? {
          admissionFee: c.fee.admissionFee,
          monthlyFee: c.fee.monthlyFee,
          annualCharges: c.fee.annualCharges,
          securityFee: c.fee.securityFee,
        }
      : null,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Fee Structure</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit fees per class. Changes appear on the public Fee Structure page
          within the hour (or immediately after a redeploy).
        </p>
      </div>
      <FeeEditor classes={data} />
    </div>
  );
}
