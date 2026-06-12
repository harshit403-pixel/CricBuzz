/**
 * Team Validator
 *
 * Defines request validation rules for Team APIs using Zod.
 *
 * Validation responsibilities:
 * - Validate incoming request payloads before controller execution.
 * - Keep API input rules separate from business logic.
 * - Return consistent validation errors through the global error handler.
 */

import { z } from "zod";
import ValidationError from "../../shared/error/validation.error.js";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid player id");

const createTeamSchema = z.object({
  name: z.string().trim().min(2, "Team name must be at least 2 characters"),

  shortName: z
    .string()
    .trim()
    .min(2, "Short name must be at least 2 characters"),

  logo: z.string().trim().min(1, "Logo is required"),

  primaryColor: z.string().trim().optional(),

  squadPlayers: z.array(objectIdSchema).optional(),
});

const updateTeamSchema = createTeamSchema.partial();

/**
 * Creates Express validation middleware for a given Zod schema.
 *
 * On success:
 * - replaces req.body with sanitized/parsed data.
 *
 * On failure:
 * - forwards a ValidationError to the global error handler.
 */
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

export const validateCreateTeam = validate(createTeamSchema);
export const validateUpdateTeam = validate(updateTeamSchema);