import { io } from "socket.io-client";

const socket = io("https://virtual-study-room-backend-3.onrender.com",{
  autoConnect: false,
});

export default socket;