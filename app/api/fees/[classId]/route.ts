import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { feeUpdateSchema } from "@/lib/validations/fee";
import type { ApiResponse } from "@/types";

// Next.js 15: dynamic route `params` are now a Promise and must be awaited.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  try {
    const { classId } = await params;
    const body = await request.json();
    const parsed = feeUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: parsed.error.errors[0]?.message ?? "Invalid fee values." },
        { status: 400 }
      );
    }

    const fee = await prisma.fee.upsert({
      where: { classId },
      update: parsed.data,
      create: { classId, ...parsed.data },
    });

    return NextResponse.json<ApiResponse<typeof fee>>({
      success: true,
      message: "Fee updated.",
      data: fee,
    });
  } catch (error) {
    console.error("Failed to update fee:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Could not update this fee." },
      { status: 500 }
    );
  }
}
