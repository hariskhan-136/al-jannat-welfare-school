import { z } from "zod";

export const statsContentSchema = z.object({
  students: z.coerce.number().int().min(0),
  teachers: z.coerce.number().int().min(0),
  classrooms: z.coerce.number().int().min(0),
  yearsOfExcellence: z.coerce.number().int().min(0),
});

export type StatsContentValues = z.infer<typeof statsContentSchema>;
