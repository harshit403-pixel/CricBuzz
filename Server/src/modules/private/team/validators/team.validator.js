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

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid player id");

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Team name must be at least 2 characters"),

    shortName: z
      .string()
      .trim()
      .min(2, "Short name must be at least 2 characters"),

    logo: z.string().trim().min(1, "Logo is required"),

    primaryColor: z.string().trim().optional(),

    squadPlayers: z.array(objectIdSchema).optional(),
  }),
});

export const updateTeamSchema = z.object({
  body: createTeamSchema.partial(),
});
