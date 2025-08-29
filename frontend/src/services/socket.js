
// services/socket.js
import { io } from "socket.io-client";

let socket = null;

export const initSocket = (token) => {
  socket = io("http://localhost:3000", {
    auth: { token },
  });
  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
  socket = null;
};
