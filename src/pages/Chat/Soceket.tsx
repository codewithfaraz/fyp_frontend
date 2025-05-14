// socket.js
import { io } from "socket.io-client";

// Create the socket connection
const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"], // Try forcing websocket first
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Add some logging to help debug
socket.on("connect", () => {
  console.log("Socket connected with ID:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

export default socket;
