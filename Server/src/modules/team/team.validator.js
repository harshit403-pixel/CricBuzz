/**
 * Team Validator
 *
 * Defines request validation rules for Team APIs using Zod.
 * This layer ensures invalid request payloads are rejected
 * before they reach controller or service logic.
 *
 * Keep API input validation here instead of mixing it with controllers.
 */
import { z } from "zod";
import ValidationError from "../../shared/error/validation.error.js";

const createTeamSchema = z.object({
  name: z.string().trim().min(2, "Team name must be at least 2 characters"),
  shortName: z.string().trim().min(2, "Short name must be at least 2 characters"),
  country: z.string().trim().optional(),
  logo: z.string().trim().url("Logo must be a valid URL").optional().or(z.literal("")),
  description: z.string().trim().optional(),
  isActive: z.boolean().optional(),
});

const updateTeamSchema = createTeamSchema.partial();

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues.map((issue) => issue.message).join(", ");
    return next(new ValidationError(message));
  }

  req.body = result.data;
  return next();
};

export const validateCreateTeam = validate(createTeamSchema);
export const validateUpdateTeam = validate(updateTeamSchema);