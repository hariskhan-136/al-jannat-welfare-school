import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/require-admin";
import type { ApiResponse } from "@/types";

const CATEGORIES = ["CAMPUS", "EVENTS", "CLASSROOMS", "SPORTS", "LABS"] as const;
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const metaSchema = z.object({
  title: z.string().trim().min(2, "Title is required.").max(100),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: "Select a valid category." }) }),
  caption: z.string().trim().max(200).optional().or(z.literal("")),
});

export async function GET() {
  const items = await prisma.galleryItem.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json<ApiResponse<typeof items>>({
    success: true,
    message: "Gallery fetched.",
    data: items,
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if ("response" in auth) return auth.response;

  try {
    const formData = await request.formData();
    const parsed = metaSchema.safeParse({
      title: formData.get("title")?.toString() ?? "",
      category: formData.get("category")?.toString() ?? "",
      caption: formData.get("caption")?.toString() ?? "",
    });

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: parsed.error.errors[0]?.message ?? "Invalid data." },
        { status: 400 }
      );
    }

    const file = formData.get("image");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "An image file is required." },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Image must be under 8MB." },
        { status: 400 }
      );
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Image must be JPG, PNG, or WEBP." },
        { status: 400 }
      );
    }

    const upload = await uploadFileToCloudinary(file, "gallery");

    const item = await prisma.galleryItem.create({
      data: {
        title: parsed.data.title,
        category: parsed.data.category,
        caption: parsed.data.caption || null,
        imageUrl: upload.url,
        cloudinaryPublicId: upload.publicId,
      },
    });

    return NextResponse.json<ApiResponse<typeof item>>(
      { success: true, message: "Photo uploaded.", data: item },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gallery upload failed:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
