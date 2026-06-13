import { z } from "zod";
import PLAYER_ROLES from "../../../shared/constant/player.constant.js";

export const createPlayerSchema = z.object({
  body: z.object({
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
  }),
});

export const updatePlayerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).optional(),

    image: z
      .string()
      .trim()
      .url("Image must be a valid URL")
      .optional()
      .or(z.literal("")),

    role: z.enum(Object.values(PLAYER_ROLES)).optional(),

    country: z.string().trim().min(2).optional(),

    battingStyle: z.string().trim().optional(),

    bowlingStyle: z.string().trim().optional(),
  }),
});

export const playerIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid player ID"),
  }),
});