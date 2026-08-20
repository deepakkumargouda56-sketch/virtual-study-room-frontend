import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import testConnection from "./config/testConnection";
import { Server } from "socket.io";
import { socketAuth } from "./middleware/socketAuth.middleware";
import { createStudySession } from "./models/studySession.model";

const PORT = process.env.PORT || 3000;

// Create HTTP server using Express app
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

  io.use(socketAuth);

 const onlineUsers = new Map<
  string,
  {
    userId: number;
    userName: string;
    roomId: number;
  }
>();


  const studySessions = new Map<
  string,
  number
>();




const getOnlineUsers = (roomId: number) => {
  const users: {
    id: number;
    name: string;
  }[] = [];

  for (const [, user] of onlineUsers) {

    if (user.roomId === roomId) {
      users.push({
        id: user.userId,
        name: user.userName,
      });
    }

  }

  return users;
};
// Socket connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on(
    "join-room",
    (data: { roomId: number }) => {
      const user = (socket as any).user;

      socket.join(`room-${data.roomId}`);

      onlineUsers.set(socket.id, {
      userId: user.id,
      userName: user.name,
      roomId: data.roomId,
       });
       console.log(onlineUsers);

       socket.emit("joined-room", {
  message: `Successfully joined room-${data.roomId}`,
    });

    socket.on("start-study", () => {

        studySessions.set(socket.id, Date.now());
        const user = onlineUsers.get(socket.id);
        if (user) {
        socket.broadcast
        .to(`room-${user.roomId}`)
        .emit("user-started-study", {
        userName: user.userName,
        message: `${user.userName} started studying 📚`,
      });
   }
      console.log(
      "Study started:",
      socket.id
     );
  });
    
    socket.on("stop-study", async () =>{

        const startTime = studySessions.get(socket.id);

        if (!startTime) {
         console.log("Study session not found");
         return;
         }


        const duration = Date.now() - startTime;

         const user = onlineUsers.get(socket.id);

        if (user) {

        const endTime = new Date();

        const durationSeconds = Math.floor(
        duration / 1000
        );

       await createStudySession(
       user.userId,
       user.roomId,
       new Date(startTime),
       endTime,
       durationSeconds
       );
        }
        const formattedTime = formatDuration(duration);
        console.log(
        "Study duration:",
        formattedTime
       );


     socket.emit("study-completed", {
      duration: formattedTime,
     });


  studySessions.delete(socket.id);
    });

   const users = getOnlineUsers(data.roomId);

    io.to(`room-${data.roomId}`).emit("online-users", {
     users,
   });

      socket.broadcast.to(`room-${data.roomId}`).emit("user-joined", {
      userName: user.name,
      message: `${user.name} joined the room`,
    });

    }
  );
    

     const formatDuration = (milliseconds: number) => {

       const seconds = Math.floor(milliseconds / 1000);

        const hours = Math.floor(seconds / 3600);

        const minutes = Math.floor((seconds % 3600) / 60);

         const remainingSeconds = seconds % 60;
        return {
           hours,
           minutes,
           seconds: remainingSeconds,
         };
      };


  socket.on("disconnect", () => {
  const user = onlineUsers.get(socket.id);
  const roomId = user?.roomId;

  if (user) {
    console.log(user.userName, "disconnected");
  }

  console.log("A user disconnected:", socket.id);

  onlineUsers.delete(socket.id);

  if (roomId) {
  const users = getOnlineUsers(roomId);

  io.to(`room-${roomId}`).emit("online-users", {
    users,
  });
   }

  console.log(onlineUsers);
});
});

testConnection();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});