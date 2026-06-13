import { z } from "zod";
import PLAYER_ROLES from "../../../shared/constant/player.constant.js";

const playerBodySchema = z.object({
  name: z.string().trim().min(2, "Player name must be at least 2 characters"),

  image: z
    .string()
    .trim()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")),

  role: z.enum(Object.values(PLAYER_ROLES)),

  country: z.string().trim().min(2, "Country must be at least 2 characters"),

  battingStyle: z.string().trim().optional(),

  bowlingStyle: z.string().trim().optional(),
});

export const createPlayerSchema = z.object({
  body: playerBodySchema,
});

export const updatePlayerSchema = z.object({
  body: playerBodySchema.partial(),
});

export const playerIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid player ID"),
  }),
});