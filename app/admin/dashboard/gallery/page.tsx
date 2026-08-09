import { prisma } from "@/lib/prisma";
import { GalleryManager } from "@/components/admin/gallery/gallery-manager";
import type { GalleryItemRecord } from "@/types";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const data: GalleryItemRecord[] = items.map((i) => ({
    id: i.id,
    title: i.title,
    category: i.category,
    imageUrl: i.imageUrl,
    caption: i.caption,
    order: i.order,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Gallery</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload new photos and remove ones that are no longer relevant.
        </p>
      </div>
      <GalleryManager initialItems={data} />
    </div>
  );
}
