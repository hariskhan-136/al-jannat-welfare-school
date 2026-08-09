import { prisma } from "@/lib/prisma";

export interface ClassFeeData {
  id: string;
  className: string;
  section: string;
  admissionFee: number;
  monthlyFee: number;
  annualCharges: number;
  securityFee: number;
}

export async function getFeeStructure(): Promise<ClassFeeData[]> {
  const classes = await prisma.schoolClass.findMany({
    orderBy: { level: "asc" },
    include: { fee: true },
  });

  return classes
    .filter((c) => c.fee)
    .map((c) => ({
      id: c.id,
      className: c.name,
      section: c.section ?? "Other",
      admissionFee: c.fee!.admissionFee,
      monthlyFee: c.fee!.monthlyFee,
      annualCharges: c.fee!.annualCharges,
      securityFee: c.fee!.securityFee,
    }));
}
