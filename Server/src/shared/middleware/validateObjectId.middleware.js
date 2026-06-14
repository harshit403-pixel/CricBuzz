import { z } from "zod";
import ValidationError from "../error/validation.error.js";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const validateParamId = (paramName = "id") => {
  return (req, res, next) => {
    const result = objectIdSchema.safeParse(req.params[paramName]);

    if (!result.success) {
      return next(new ValidationError("Invalid ID format"));
    }

    return next();
  };
};
