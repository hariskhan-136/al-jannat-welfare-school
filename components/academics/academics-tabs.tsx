"use client";

import { motion } from "framer-motion";
import { FileDown, BookOpen } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { AcademicSectionData } from "@/lib/data/academics";

export function AcademicsTabs({ sections }: { sections: AcademicSectionData[] }) {
  if (sections.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Academic information will be published here shortly.
      </p>
    );
  }

  return (
    <Tabs defaultValue={sections[0].section} className="flex flex-col items-center">
      <TabsList>
        {sections.map((s) => (
          <TabsTrigger key={s.section} value={s.section}>
            {s.section}
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map((s) => (
        <TabsContent key={s.section} value={s.section} className="w-full">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.classes.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {cls.name}
                  </h3>
                </div>

                <div className="mt-4 flex flex-1 flex-wrap gap-1.5">
                  {cls.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                {cls.syllabus && (
                  <Button asChild variant="outline" size="sm" className="mt-5">
                    <a href={cls.syllabus.fileUrl} download>
                      <FileDown className="h-4 w-4" aria-hidden="true" /> Download Syllabus
                    </a>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
