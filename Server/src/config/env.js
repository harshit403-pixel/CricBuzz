import dotenv from "dotenv";
dotenv.config();
import z from "zod";
import logger from "./logger.js";
import appConstant from "../constant/app.constant.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGODB_URI: z.string().default(appConstant.MONGODB_URI),
  NODE_ENV: z.string().default(appConstant.NODE_ENV),
  LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  logger.error({ errors: env.error.issues }, "Environment validation failed");
  process.exit(1);
}

export default env.data;
