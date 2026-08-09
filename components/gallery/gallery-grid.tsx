"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GalleryItemData } from "@/lib/data/gallery";
import type { GalleryCategory } from "@/types";

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  CAMPUS: "Campus",
  EVENTS: "Events",
  CLASSROOMS: "Classrooms",
  SPORTS: "Sports",
  LABS: "Labs",
};

export function GalleryGrid({ items }: { items: GalleryItemData[] }) {
  const [activeCategory, setActiveCategory] = React.useState<"ALL" | GalleryCategory>("ALL");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const categories = Array.from(new Set(items.map((i) => i.category)));

  const filtered =
    activeCategory === "ALL" ? items : items.filter((i) => i.category === activeCategory);

  const slides = filtered.map((item) => ({
    src: item.imageUrl,
    alt: item.title,
    title: item.title,
    description: item.caption ?? undefined,
  }));

  if (items.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Gallery photos will be added here soon.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Tabs
        value={activeCategory}
        onValueChange={(v) => setActiveCategory(v as "ALL" | GalleryCategory)}
      >
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border shadow-soft"
              aria-label={`View photo: ${item.title}`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.title}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        index={lightboxIndex ?? 0}
        close={() => setLightboxIndex(null)}
        slides={slides}
      />
    </div>
  );
}
