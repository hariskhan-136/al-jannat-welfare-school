import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/data/gallery";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of campus life, events, classrooms, sports, and labs at Al Jannat Welfare School Nowshera.",
  alternates: { canonical: "/gallery" },
};

export const revalidate = 1800;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Gallery
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            A look inside our campus
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
            Campus life, events, classrooms, sports, and labs — a glimpse of what
            your child's day at Al Jannat looks like.
          </p>
        </div>

        <div className="mt-14">
          <GalleryGrid items={items} />
        </div>
      </div>
    </div>
  );
}
