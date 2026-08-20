import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

export const socketAuth = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const token = socket.handshake.auth.token;
    console.log("Token:", token);

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    (socket as any).user = decoded;
    next();

  } catch (error) {
    return next(new Error("Invalid or expired token"));
  }
};

console.log("Socket Auth Middleware Running");