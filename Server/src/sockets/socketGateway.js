import { Server } from "socket.io";
import env from "../config/env.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Client can listen to updates for just one match
    socket.on("join_match", (matchId) => {
      socket.join(matchId);
      console.log(`Client ${socket.id} joined room: ${matchId}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
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
