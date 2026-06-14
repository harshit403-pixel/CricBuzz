import { z } from "zod";

export const createSeriesSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Series name must be at least 2 characters"),

  shortName: z
    .string()
    .trim()
    .min(2, "Short name must be at least 2 characters"),

  season: z
    .string()
    .trim()
    .min(2, "Season must be at least 2 characters"),

  status: z.string().optional(),

  logo: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
});