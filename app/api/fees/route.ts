import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import type { ApiResponse } from "@/types";

export async function GET() {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  const classes = await prisma.schoolClass.findMany({
    orderBy: { level: "asc" },
    include: { fee: true },
  });

  return NextResponse.json<ApiResponse<typeof classes>>({
    success: true,
    message: "Fee structure fetched.",
    data: classes,
  });
}
