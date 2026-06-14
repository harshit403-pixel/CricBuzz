/**
 * Squad Validator
 *
 * Defines request validation schemas for Squad Management APIs.
 *
 * Squad APIs are nested under the Team resource, so validation checks
 * route params like teamId and playerId along with the add-player body.
 */

import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const teamIdSchema = z.object({
  params: z.object({
    teamId: objectIdSchema,
  }),
});

export const addPlayerToSquadSchema = z.object({
  params: z.object({
    teamId: objectIdSchema,
  }),

  body: z.object({
    playerId: objectIdSchema,
  }),
});

export const removePlayerFromSquadSchema = z.object({
  params: z.object({
    teamId: objectIdSchema,
    playerId: objectIdSchema,
  }),
});