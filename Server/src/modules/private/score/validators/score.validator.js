/**
 * Score Validator
 *
 * Defines request validation rules for Score APIs using Zod.
 */

import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const oversSchema = z
  .string()
  .trim()
  .regex(/^\d+(\.[0-5])?$/, "Overs must be in a valid format");

const scoreBodySchema = z.object({
  matchId: objectIdSchema,

  innings: z.number().int().min(1).max(2),

  battingTeam: objectIdSchema,

  score: z.number().int().min(0),

  wickets: z.number().int().min(0).max(10, "Wickets cannot be more than 10"),

  overs: oversSchema,

  runRate: z.number().min(0),

  target: z.number().int().min(0).optional().nullable(),
});

export const createScoreSchema = z.object({
  body: scoreBodySchema,
});

export const updateScoreSchema = z.object({
  body: scoreBodySchema.partial(),
});
