import { prisma } from "@/lib/prisma";
import type { GalleryCategory } from "@/types";

export interface GalleryItemData {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  caption: string | null;
}

export async function getGalleryItems(): Promise<GalleryItemData[]> {
  const items = await prisma.galleryItem.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    imageUrl: item.imageUrl,
    caption: item.caption,
  }));
}
