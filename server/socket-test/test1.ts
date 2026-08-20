import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6IkRlZXBhayIsImVtYWlsIjoiZGVlcGFrQGdtYWlsLmNvbSIsImlhdCI6MTc4Njk3NjgyMiwiZXhwIjoxNzg3NTgxNjIyfQ.yTQTlcMRkgN9_vrtNPSISQmIJ7eA4stWQw3U7ceY5oU",
  },
});

socket.on("connect", () => {
  console.log("Connected to server!");
  console.log("Socket ID:", socket.id);

 socket.emit("join-room", {
  roomId: 1,
});
  setTimeout(() => {
  socket.emit("start-study");
}, 1000);
});

  setTimeout(() => {

  socket.emit("stop-study");

}, 10000);


socket.on("joined-room", (data) => {
  console.log(data.message);
});
   
  socket.on("online-users", (data) => {
  console.log("Online Users:", data.users);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("user-joined", (data) => {
  console.log(data.message);
});

socket.on("connect_error", (err) => {
  console.log("Connection Error:", err.message);
});

socket.on("study-completed", (data) => {
  console.log(
    "My Study Time:",
    data.duration
  );
});

socket.on("user-started-study", (data) => {
  console.log(data.message);
});