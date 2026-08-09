import { PrismaClient, GalleryCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const CLASSES = [
  {
    name: "Playgroup",
    level: 0,
    section: "Pre-Primary",
    admissionFee: 3000,
    monthlyFee: 2500,
  },
  {
    name: "Nursery",
    level: 1,
    section: "Pre-Primary",
    admissionFee: 3000,
    monthlyFee: 2500,
  },
  {
    name: "Prep",
    level: 2,
    section: "Pre-Primary",
    admissionFee: 3500,
    monthlyFee: 2800,
  },
  { name: "Class 1", level: 3, section: "Primary", admissionFee: 4000, monthlyFee: 3000 },
  { name: "Class 2", level: 4, section: "Primary", admissionFee: 4000, monthlyFee: 3000 },
  { name: "Class 3", level: 5, section: "Primary", admissionFee: 4000, monthlyFee: 3200 },
  { name: "Class 4", level: 6, section: "Primary", admissionFee: 4500, monthlyFee: 3200 },
  { name: "Class 5", level: 7, section: "Primary", admissionFee: 4500, monthlyFee: 3500 },
  { name: "Class 6", level: 8, section: "Middle", admissionFee: 5000, monthlyFee: 3800 },
  { name: "Class 7", level: 9, section: "Middle", admissionFee: 5000, monthlyFee: 3800 },
  { name: "Class 8", level: 10, section: "Middle", admissionFee: 5500, monthlyFee: 4000 },
];

const SUBJECTS_BY_SECTION: Record<string, string[]> = {
  "Pre-Primary": ["English", "Urdu", "Numeracy", "Nazra Qur'an", "Rhymes & Art"],
  Primary: [
    "English",
    "Urdu",
    "Mathematics",
    "Science",
    "Islamiyat",
    "Social Studies",
    "Computer Science",
  ],
  Middle: [
    "English",
    "Urdu",
    "Mathematics",
    "General Science",
    "Islamiyat",
    "Pakistan Studies",
    "Computer Science",
  ],
};

const GALLERY_SEED: {
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  caption: string;
}[] = [
  {
    title: "Main Campus Building",
    category: GalleryCategory.CAMPUS,
    imageUrl: "/images/gallery/campus-1.jpg",
    caption: "Our main academic block",
  },
  {
    title: "School Entrance",
    category: GalleryCategory.CAMPUS,
    imageUrl: "/images/gallery/campus-2.jpg",
    caption: "Main gate and reception",
  },
  {
    title: "Annual Sports Day",
    category: GalleryCategory.EVENTS,
    imageUrl: "/images/gallery/events-1.jpg",
    caption: "Annual Sports Day 2025",
  },
  {
    title: "Independence Day Celebration",
    category: GalleryCategory.EVENTS,
    imageUrl: "/images/gallery/events-2.jpg",
    caption: "14th August celebrations",
  },
  {
    title: "Primary Classroom",
    category: GalleryCategory.CLASSROOMS,
    imageUrl: "/images/gallery/classroom-1.jpg",
    caption: "Class 3 in session",
  },
  {
    title: "Smart Classroom",
    category: GalleryCategory.CLASSROOMS,
    imageUrl: "/images/gallery/classroom-2.jpg",
    caption: "Digital-enabled learning",
  },
  {
    title: "Football Practice",
    category: GalleryCategory.SPORTS,
    imageUrl: "/images/gallery/sports-1.jpg",
    caption: "After-school football practice",
  },
  {
    title: "Athletics Meet",
    category: GalleryCategory.SPORTS,
    imageUrl: "/images/gallery/sports-2.jpg",
    caption: "Inter-house athletics",
  },
  {
    title: "Science Lab",
    category: GalleryCategory.LABS,
    imageUrl: "/images/gallery/labs-1.jpg",
    caption: "Chemistry practical session",
  },
  {
    title: "Computer Lab",
    category: GalleryCategory.LABS,
    imageUrl: "/images/gallery/labs-2.jpg",
    caption: "IT skills class",
  },
];

async function main() {
  // Admin
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
  await prisma.admin.upsert({
    where: { email: "admin@aljannatschool.edu.pk" },
    update: {},
    create: {
      name: "School Administrator",
      email: "admin@aljannatschool.edu.pk",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  // Classes + Fees
  for (const c of CLASSES) {
    const cls = await prisma.schoolClass.upsert({
      where: { name: c.name },
      update: { level: c.level, section: c.section },
      create: { name: c.name, level: c.level, section: c.section },
    });

    await prisma.fee.upsert({
      where: { classId: cls.id },
      update: { admissionFee: c.admissionFee, monthlyFee: c.monthlyFee },
      create: {
        classId: cls.id,
        admissionFee: c.admissionFee,
        monthlyFee: c.monthlyFee,
        annualCharges: 1500,
        securityFee: 1000,
      },
    });

    // Subjects (skip if already seeded for this class)
    const existingSubjects = await prisma.subject.count({ where: { classId: cls.id } });
    if (existingSubjects === 0) {
      const subjectNames = SUBJECTS_BY_SECTION[c.section] ?? [];
      await prisma.subject.createMany({
        data: subjectNames.map((name) => ({ name, classId: cls.id })),
      });
    }

    // Syllabus placeholder (one PDF per class — replace with real uploads later)
    const existingSyllabus = await prisma.syllabus.count({ where: { classId: cls.id } });
    if (existingSyllabus === 0) {
      await prisma.syllabus.create({
        data: {
          classId: cls.id,
          title: `${c.name} — Annual Syllabus`,
          fileUrl: `/syllabus/${c.name.toLowerCase().replace(/\s+/g, "-")}.pdf`,
        },
      });
    }
  }

  // Gallery
  for (const item of GALLERY_SEED) {
    const existing = await prisma.galleryItem.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.galleryItem.create({ data: item });
    }
  }

  // Site content blocks (editable from admin dashboard later)
  await prisma.siteContent.upsert({
    where: { key: "stats" },
    update: {
      value: {
        students: 850,
        teachers: 45,
        classrooms: 28,
        yearsOfExcellence: 9,
      },
    },
    create: {
      key: "stats",
      value: {
        students: 850,
        teachers: 45,
        classrooms: 28,
        yearsOfExcellence: 9,
      },
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
