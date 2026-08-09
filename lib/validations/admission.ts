import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = [...ACCEPTED_IMAGE_TYPES, "application/pdf"];

export const CLASS_OPTIONS = [
  "Playgroup",
  "Nursery",
  "Prep",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
] as const;

function fileSchema(accepted: string[], label: string) {
  return z
    .instanceof(File, { message: `${label} is required.` })
    .refine((file) => file.size > 0, `${label} is required.`)
    .refine((file) => file.size <= MAX_FILE_SIZE, `${label} must be under 5MB.`)
    .refine(
      (file) => accepted.includes(file.type),
      `${label} must be one of: ${accepted.map((t) => t.split("/")[1]).join(", ")}.`
    );
}

export const admissionFormSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, "Student name must be at least 2 characters.")
    .max(80, "Student name is too long."),
  fatherName: z.string().trim().min(2, "Father's name is required.").max(80),
  motherName: z.string().trim().min(2, "Mother's name is required.").max(80),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required.")
    .refine((val) => !Number.isNaN(Date.parse(val)), "Enter a valid date."),
  gender: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Select a gender." }),
  }),
  classAppliedFor: z.enum(CLASS_OPTIONS, {
    errorMap: () => ({ message: "Select the class being applied for." }),
  }),
  parentPhone: z
    .string()
    .trim()
    .regex(
      /^(\+92|0)?3\d{9}$/,
      "Enter a valid Pakistani mobile number (e.g. 03001234567)."
    ),
  parentEmail: z.string().trim().email("Enter a valid email address."),
  address: z.string().trim().min(10, "Please provide a complete address.").max(300),
  studentPhoto: fileSchema(ACCEPTED_IMAGE_TYPES, "Student photo"),
  birthCertificate: fileSchema(ACCEPTED_DOCUMENT_TYPES, "Birth certificate"),
});

export type AdmissionFormValues = z.infer<typeof admissionFormSchema>;

/** Server-side variant: files arrive as File | null from formData, validated separately from URLs. */
export const admissionServerSchema = admissionFormSchema.omit({
  studentPhoto: true,
  birthCertificate: true,
});
export type AdmissionServerValues = z.infer<typeof admissionServerSchema>;
