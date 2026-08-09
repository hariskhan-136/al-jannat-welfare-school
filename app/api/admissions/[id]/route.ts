import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import type { ApiResponse } from "@/types";

const updateSchema = z.object({
  status: z.enum(["PENDING", "REVIEWING", "ACCEPTED", "REJECTED"]).optional(),
  notes: z.string().max(1000).optional(),
});

// Next.js 15: dynamic route `params` are now a Promise and must be awaited.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid update payload." },
        { status: 400 }
      );
    }

    const updated = await prisma.admission.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json<ApiResponse<typeof updated>>({
      success: true,
      message: "Application updated.",
      data: updated,
    });
  } catch (error) {
    console.error("Failed to update admission:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Could not update this application." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  try {
    const { id } = await params;
    await prisma.admission.delete({ where: { id } });
    return NextResponse.json<ApiResponse>({ success: true, message: "Application deleted." });
  } catch (error) {
    console.error("Failed to delete admission:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Could not delete this application." },
      { status: 500 }
    );
  }
}
