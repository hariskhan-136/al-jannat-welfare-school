import { z } from "zod";

export const feeUpdateSchema = z.object({
  admissionFee: z.coerce.number().int().min(0, "Must be 0 or more."),
  monthlyFee: z.coerce.number().int().min(0, "Must be 0 or more."),
  annualCharges: z.coerce.number().int().min(0, "Must be 0 or more."),
  securityFee: z.coerce.number().int().min(0, "Must be 0 or more."),
});

export type FeeUpdateValues = z.infer<typeof feeUpdateSchema>;
