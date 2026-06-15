/**
 * Commentary Validator
 *
 * Checks request body for creating typed commentary
 * and params for deleting commentary.
 */

import { z } from "zod";

import COMMENTARY_TYPE from "../../../../shared/constant/commentary.constant.js";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const createCommentarySchema = z.object({
  body: z.object({
    matchId: objectIdSchema,
    innings: z.number().int().min(1),
    over: z.number().int().min(0),
    ball: z.number().int().min(1).max(6),
    battingTeam: objectIdSchema,
    player: objectIdSchema.optional(),
    type: z.enum(Object.values(COMMENTARY_TYPE)),
    message: z.string().trim().min(1, "Message is required"),
    runs: z.number().int().min(0).default(0),
    wicket: z.boolean().default(false),
  }),
});

export const deleteCommentarySchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});