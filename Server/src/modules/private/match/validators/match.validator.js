import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const matchIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const createMatchSchema = z.object({
  body: z
    .object({
      seriesId: objectIdSchema,
      team1: objectIdSchema,
      team2: objectIdSchema,
      venue: z.string().trim().min(1, "Value is required"),
      startTime: z.string().trim().pipe(z.iso.datetime()),
      matchNumber: z.string().trim().optional(),
    })
    .refine((data) => data.team1 !== data.team2, {
      message: "Team1 and Team2 cannot be the same team",
      path: ["team2"], // highlights team2 field in validation error msg
    }),
});

export const updateMatchSchema = z.object({
  body: z.object({
    venue: z.string().trim().optional(),
    startTime: z.string().trim().pipe(z.iso.datetime()).optional(),
    matchNumber: z.string().trim().optional(),
  }),
});

export const tossSchema = z.object({
  body: z.object({
    tossWinner: objectIdSchema,
    tossDecision: z.enum(["BAT", "BOWL"], {
      message: "Toss decision must be either BAT or BOWL",
    }),
  }),
});

export const completeMatchSchema = z.object({
  body: z.object({
    winner: objectIdSchema,
    result: z.string().trim().min(1, "result description is required"),
  }),
});
