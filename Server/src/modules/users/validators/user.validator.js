import { z } from "zod";

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  }),
});
