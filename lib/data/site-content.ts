import { prisma } from "@/lib/prisma";
import { statsContentSchema, type StatsContentValues } from "@/lib/validations/content";

const FALLBACK_STATS: StatsContentValues = {
  students: 850,
  teachers: 45,
  classrooms: 28,
  yearsOfExcellence: 9,
};

/**
 * Reads the homepage "stats" content block from the database. Falls back to
 * sensible defaults if the block hasn't been seeded or fails validation, so
 * the homepage never breaks because of missing/malformed admin-edited content.
 */
export async function getHomepageStats(): Promise<StatsContentValues> {
  try {
    const record = await prisma.siteContent.findUnique({ where: { key: "stats" } });
    if (!record) return FALLBACK_STATS;

    const parsed = statsContentSchema.safeParse(record.value);
    return parsed.success ? parsed.data : FALLBACK_STATS;
  } catch {
    return FALLBACK_STATS;
  }
}
