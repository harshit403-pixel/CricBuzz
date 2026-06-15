import { z } from "zod";

export const PLAYER_ROLES = {
  BATTER: "BATTER",
  BOWLER: "BOWLER",
  ALL_ROUNDER: "ALL_ROUNDER",
  WICKET_KEEPER: "WICKET_KEEPER",
};

export const playerSchema = z.object({
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

  role: z.enum([
    PLAYER_ROLES.BATTER,
    PLAYER_ROLES.BOWLER,
    PLAYER_ROLES.ALL_ROUNDER,
    PLAYER_ROLES.WICKET_KEEPER,
  ]),

  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters"),

  battingStyle: z.string().trim().optional(),

  bowlingStyle: z.string().trim().optional(),
});