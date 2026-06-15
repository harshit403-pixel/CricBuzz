import http from "http";
import createApp from "./app.js";
import { connectDB } from "./config/db.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import { initSocket } from "./sockets/socketGateway.js";

const app = createApp();
const server = http.createServer(app);

initSocket(server);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(env.PORT, () => {
      logger.info({ port: env.PORT }, "Server listening");
    });
  } catch (err) {
    logger.error({ error: err }, "failed to start server");
    process.exit(1);
  }
};

startServer();
