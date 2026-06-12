import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import appConstant from "../shared/constant/app.constant.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGODB_URI: z.string().default(appConstant.MONGODB_URI),
  NODE_ENV: z.string().default(appConstant.NODE_ENV),
  LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
  CORS_ORIGIN: z.string(),
  RATELIMIT_WINDOW_MS: z.coerce
    .number()
    .default(appConstant.RATELIMIT_WINDOW_MS),
  RATELIMIT_MAX_REQUESTS: z.coerce
    .number()
    .default(appConstant.RATELIMIT_MAX_REQUESTS),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  JWT_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.coerce.number(),
  CLIENT_URL: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "Environment validation failed",
    JSON.stringify(env.error.issues, null, 2),
  );
  process.exit(1);
}

export default env.data;
