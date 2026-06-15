import { z } from "zod";

export const teamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Team name must be at least 2 characters"),

  shortName: z
    .string()
    .trim()
    .min(2, "Short name must be at least 2 characters"),

  logo: z
    .string()
    .trim()
    .min(1, "Logo is required"),

  primaryColor: z.string().trim().optional(),
});