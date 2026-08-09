import { prisma } from "@/lib/prisma";

export interface AcademicClassData {
  id: string;
  name: string;
  section: string;
  subjects: string[];
  syllabus: { title: string; fileUrl: string } | null;
}

export interface AcademicSectionData {
  section: string;
  classes: AcademicClassData[];
}

const SECTION_ORDER = ["Pre-Primary", "Primary", "Middle"];

/**
 * Fetches all classes with their subjects and latest syllabus, grouped and
 * ordered by section (Pre-Primary -> Primary -> Middle -> Matric).
 */
export async function getAcademicsData(): Promise<AcademicSectionData[]> {
  const classes = await prisma.schoolClass.findMany({
    orderBy: { level: "asc" },
    include: {
      subjects: { orderBy: { name: "asc" } },
      syllabuses: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  const grouped = new Map<string, AcademicClassData[]>();

  for (const cls of classes) {
    const section = cls.section ?? "Other";
    const entry: AcademicClassData = {
      id: cls.id,
      name: cls.name,
      section,
      subjects: cls.subjects.map((s) => s.name),
      syllabus: cls.syllabuses[0]
        ? { title: cls.syllabuses[0].title, fileUrl: cls.syllabuses[0].fileUrl }
        : null,
    };
    grouped.set(section, [...(grouped.get(section) ?? []), entry]);
  }

  return SECTION_ORDER.filter((s) => grouped.has(s)).map((section) => ({
    section,
    classes: grouped.get(section) ?? [],
  }));
}
