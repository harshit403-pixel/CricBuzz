export default {
  PORT: 3000,
  MONGODB_URI: "mongodb://localhost:27017/",
  NODE_ENV: "development",
  LOGGER_LEVEL: "info",
  RATELIMIT_WINDOW_MS: 15 * 60 * 1000,
  RATELIMIT_MAX_REQUESTS: 100,
};
