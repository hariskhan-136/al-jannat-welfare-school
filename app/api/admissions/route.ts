import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { sendAdmissionEmails } from "@/lib/email";
import { admissionServerSchema } from "@/lib/validations/admission";
import { requireAdmin } from "@/lib/require-admin";
import type { ApiResponse } from "@/types";
import type { AdmissionStatus } from "@prisma/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = [...ACCEPTED_IMAGE_TYPES, "application/pdf"];

/** GET /api/admissions — admin-only list, optionally filtered by ?status= */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  const status = request.nextUrl.searchParams.get("status") as AdmissionStatus | null;
  const validStatuses: AdmissionStatus[] = ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED"];

  const admissions = await prisma.admission.findMany({
    where: status && validStatuses.includes(status) ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json<ApiResponse<typeof admissions>>({
    success: true,
    message: "Admissions fetched.",
    data: admissions,
  });
}

function validateFile(
  file: FormDataEntryValue | null,
  accepted: string[],
  label: string
): { ok: true; file: File } | { ok: false; error: string } {
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: `${label} is required.` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: `${label} must be under 5MB.` };
  }
  if (!accepted.includes(file.type)) {
    return { ok: false, error: `${label} has an unsupported file type.` };
  }
  return { ok: true, file };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const fields = {
      studentName: formData.get("studentName")?.toString() ?? "",
      fatherName: formData.get("fatherName")?.toString() ?? "",
      motherName: formData.get("motherName")?.toString() ?? "",
      dateOfBirth: formData.get("dateOfBirth")?.toString() ?? "",
      gender: formData.get("gender")?.toString() ?? "",
      classAppliedFor: formData.get("classAppliedFor")?.toString() ?? "",
      parentPhone: formData.get("parentPhone")?.toString() ?? "",
      parentEmail: formData.get("parentEmail")?.toString() ?? "",
      address: formData.get("address")?.toString() ?? "",
    };

    const parsed = admissionServerSchema.safeParse(fields);
    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Invalid form data.";
      return NextResponse.json<ApiResponse>({ success: false, message }, { status: 400 });
    }

    const photoCheck = validateFile(
      formData.get("studentPhoto"),
      ACCEPTED_IMAGE_TYPES,
      "Student photo"
    );
    if (!photoCheck.ok) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: photoCheck.error },
        { status: 400 }
      );
    }

    const certCheck = validateFile(
      formData.get("birthCertificate"),
      ACCEPTED_DOCUMENT_TYPES,
      "Birth certificate"
    );
    if (!certCheck.ok) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: certCheck.error },
        { status: 400 }
      );
    }

    const [photoUpload, certUpload] = await Promise.all([
      uploadFileToCloudinary(photoCheck.file, "admissions/photos"),
      uploadFileToCloudinary(certCheck.file, "admissions/birth-certificates"),
    ]);

    const admission = await prisma.admission.create({
      data: {
        studentName: parsed.data.studentName,
        fatherName: parsed.data.fatherName,
        motherName: parsed.data.motherName,
        dateOfBirth: new Date(parsed.data.dateOfBirth),
        gender: parsed.data.gender,
        classAppliedFor: parsed.data.classAppliedFor,
        parentPhone: parsed.data.parentPhone,
        parentEmail: parsed.data.parentEmail,
        address: parsed.data.address,
        studentPhotoUrl: photoUpload.url,
        birthCertUrl: certUpload.url,
      },
    });

    // Email notifications are best-effort — a delivery failure shouldn't fail the submission.
    try {
      await sendAdmissionEmails(parsed.data);
    } catch (emailError) {
      console.error("Admission email notification failed:", emailError);
    }

    return NextResponse.json<ApiResponse<{ id: string }>>(
      {
        success: true,
        message: "Application submitted successfully.",
        data: { id: admission.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admission submission failed:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
