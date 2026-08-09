import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import type { ApiResponse } from "@/types";

// Next.js 15: dynamic route `params` are now a Promise and must be awaited.

/** GET is public — the homepage reads content blocks at render time. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const content = await prisma.siteContent.findUnique({ where: { key } });

  if (!content) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Content block not found." },
      { status: 404 }
    );
  }

  return NextResponse.json<ApiResponse<typeof content>>({
    success: true,
    message: "Content fetched.",
    data: content,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  try {
    const { key } = await params;
    const body = await request.json();

    const content = await prisma.siteContent.upsert({
      where: { key },
      update: { value: body },
      create: { key, value: body },
    });

    return NextResponse.json<ApiResponse<typeof content>>({
      success: true,
      message: "Content updated.",
      data: content,
    });
  } catch (error) {
    console.error("Failed to update site content:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Could not update this content block." },
      { status: 500 }
    );
  }
}
