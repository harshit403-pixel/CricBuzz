import { z } from "zod";

export const matchSchema = z
  .object({
    seriesId: z.string().min(1, "Series is required"),

    team1: z.string().min(1, "Team 1 is required"),

    team2: z.string().min(1, "Team 2 is required"),

    venue: z.string().trim().min(1, "Venue is required"),

    startTime: z.string().min(1, "Start time is required"),

    matchNumber: z.string().optional(),
  })
  .refine((data) => data.team1 !== data.team2, {
    message: "Team 1 and Team 2 cannot be the same",
    path: ["team2"],
  });

export const updateMatchSchema = z.object({
  venue: z.string().trim().min(1, "Venue is required"),

  startTime: z.string().min(1, "Start time is required"),

  matchNumber: z.string().optional(),
});
