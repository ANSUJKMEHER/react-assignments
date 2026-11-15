import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

let connectedClients = 0;

io.on("connection", (socket) => {
  connectedClients++;
  io.emit("clients_count", connectedClients);

  socket.on("chat_message", (message) => {
    // Broadcast to all clients including sender
    io.emit("chat_message", message);
  });

  socket.on("like_message", (payload) => {
    // Broadcast like count update to all clients
    io.emit("like_message", payload);
  });

  socket.on("disconnect", () => {
    connectedClients = Math.max(0, connectedClients - 1);
    io.emit("clients_count", connectedClients);
  });
});

server.listen(PORT, () => {
  console.log(`Chat WebSocket server running on http://localhost:${PORT}`);
});
