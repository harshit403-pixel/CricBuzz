import { Server } from "socket.io";
import env from "../config/env.js";
import logger from "../config/logger.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    // Client can listen to updates for just one match
    socket.on("join_match", (matchId) => {
      socket.join(matchId);
      logger.info(`Client ${socket.id} joined room: ${matchId}`);
    });

    socket.on("disconnect", () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized");
  }

  return io;
};

export const emitToMatch = (matchId, eventName, payload) => {
  if (!io) {
    logger.warn("Socket.io not initialized, skipping emissions");
    return;
  }

  // Emit only to ROOM
  io.to(matchId.toString()).emit(eventName, payload);
};
