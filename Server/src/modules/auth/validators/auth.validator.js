import { z } from "zod";
import Roles from "../../../shared/constant/role.constant.js";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().trim().lowercase().pipe(z.email()),
    password: z.string().min(6),
    role: z.enum(Roles).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().lowercase().pipe(z.email()),
    password: z.string().min(1),
  }),
});
