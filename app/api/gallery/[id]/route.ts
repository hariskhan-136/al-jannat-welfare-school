import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFileFromCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/require-admin";
import type { ApiResponse } from "@/types";

// Next.js 15: dynamic route `params` are now a Promise and must be awaited.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  try {
    const { id } = await params;
    const item = await prisma.galleryItem.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Photo not found." },
        { status: 404 }
      );
    }

    if (item.cloudinaryPublicId) {
      await deleteFileFromCloudinary(item.cloudinaryPublicId).catch((err) =>
        console.error("Cloudinary deletion failed (continuing):", err)
      );
    }

    await prisma.galleryItem.delete({ where: { id } });

    return NextResponse.json<ApiResponse>({ success: true, message: "Photo deleted." });
  } catch (error) {
    console.error("Failed to delete gallery item:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Could not delete this photo." },
      { status: 500 }
    );
  }
}
