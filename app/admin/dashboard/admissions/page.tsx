import { prisma } from "@/lib/prisma";
import { AdmissionsTable } from "@/components/admin/admissions/admissions-table";
import type { AdmissionRecord } from "@/types";

export default async function AdminAdmissionsPage() {
  const admissions = await prisma.admission.findMany({ orderBy: { createdAt: "desc" } });

  // Serialize Dates to strings to match the client-side AdmissionRecord shape.
  const data: AdmissionRecord[] = admissions.map((a) => ({
    id: a.id,
    studentName: a.studentName,
    fatherName: a.fatherName,
    motherName: a.motherName,
    dateOfBirth: a.dateOfBirth.toISOString(),
    gender: a.gender,
    classAppliedFor: a.classAppliedFor,
    parentPhone: a.parentPhone,
    parentEmail: a.parentEmail,
    address: a.address,
    studentPhotoUrl: a.studentPhotoUrl,
    birthCertUrl: a.birthCertUrl,
    status: a.status,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Admissions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review applications, view uploaded documents, and update status.
        </p>
      </div>
      <AdmissionsTable initialData={data} />
    </div>
  );
}
