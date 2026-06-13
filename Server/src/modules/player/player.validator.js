import { z } from "zod";

import ValidationError from "../../shared/error/validation.error.js";
import PLAYER_ROLES from "../../shared/constant/player.constant.js";

const createPlayerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Player name must be at least 2 characters"),

  image: z
    .string()
    .trim()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),

  role: z.enum(Object.values(PLAYER_ROLES)),

  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters"),

  battingStyle: z.string().trim().optional(),

  bowlingStyle: z.string().trim().optional(),
});

const updatePlayerSchema = createPlayerSchema.partial();

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

export const validateCreatePlayer =
  validate(createPlayerSchema);

export const validateUpdatePlayer =
  validate(updatePlayerSchema);