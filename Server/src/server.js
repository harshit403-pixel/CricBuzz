import createApp from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import { connectDB } from "./database/db.js";

const app = createApp();

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      logger.info({ port: env.PORT }, "Server listening");
    });
  } catch (err) {
    logger.error({ error: err }, "failed to start server");
    process.exit(1);
  }
};

startServer();
