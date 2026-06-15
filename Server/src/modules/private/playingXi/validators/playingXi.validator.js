/**
 * Playing XI Validator
 *
 * Checks the basic request structure:
 * match id in params and both teams' selected players in body.
 */
import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

const playingPlayerSchema = z.object({
  player: objectIdSchema,
  isCaptain: z.boolean().default(false),
  isWicketKeeper: z.boolean().default(false),
});

const playingTeamSchema = z
  .array(playingPlayerSchema)
  .length(11, "Exactly 11 players are required");

export const selectPlayingXiSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    team1: playingTeamSchema,
    team2: playingTeamSchema,
  }),
});