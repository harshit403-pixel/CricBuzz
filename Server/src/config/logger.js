import pino from "pino";
import env from "../config/env.js";

export default pino({
  level: env.LOGGER_LEVEL,
  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
        }
      : undefined,
});
