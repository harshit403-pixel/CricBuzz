/**
 * Series Validator
 *
 * Defines request validation rules for Series APIs using Zod.
 */

import { z } from "zod";
import Series from "../../../../shared/constant/series.constant.js";

export const createSeriesSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Series name must be at least 2 characters"),

    shortName: z
      .string()
      .trim()
      .min(2, "Short name must be at least 2 characters"),

    season: z.string().trim().min(2, "Season must be at least 2 characters"),

    status: z.enum(Series).optional(),

    logo: z.string().trim().url("Logo must be a valid URL").optional(),
  }),
});

export const updateSeriesSchema = z.object({
  body: createSeriesSchema.partial(),
});
