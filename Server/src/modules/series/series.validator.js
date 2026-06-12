/**
 * Series Validator
 *
 * Defines request validation rules for Series APIs using Zod.
 */

import { z } from "zod";
import ValidationError from "../../shared/error/validation.error.js";

const seriesStatusSchema = z.enum(["UPCOMING", "LIVE", "COMPLETED"]);

const createSeriesSchema = z.object({
  name: z.string().trim().min(2, "Series name must be at least 2 characters"),

  shortName: z
    .string()
    .trim()
    .min(2, "Short name must be at least 2 characters"),

  season: z.string().trim().min(2, "Season must be at least 2 characters"),

  status: seriesStatusSchema.optional(),

  logo: z.string().trim().optional(),
});

const updateSeriesSchema = createSeriesSchema.partial();

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");

    return next(new ValidationError(message));
  }

  req.body = result.data;
  return next();
};

export const validateCreateSeries = validate(createSeriesSchema);
export const validateUpdateSeries = validate(updateSeriesSchema);
