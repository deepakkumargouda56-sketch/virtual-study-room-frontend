import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IlJhbSIsImVtYWlsIjoicmFtQGdtYWlsLmNvbSIsImlhdCI6MTc4NzA0MzUzNywiZXhwIjoxNzg3NjQ4MzM3fQ.6fnMoNvjdz6BbTw1Gw9CswihKx7DdbH_FRTXF-AZ9Tw",
  },
});
socket.on("connect", () => {
  console.log("Connected to server!");
  console.log("Socket ID:", socket.id);

  socket.emit("join-room", {
    roomId: 1,
    userName: "ram"
});
});

socket.on("joined-room", (data) => {
  console.log(data.message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("user-joined", (data) => {
  console.log(data.message);
});

socket.on("user-started-study", (data) => {
  console.log(data.message);
});

socket.on("online-users", (data) => {
  console.log("Online Users:", data.users);
});