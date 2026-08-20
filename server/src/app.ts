import express from "express";
import authRoutes from "./routes/auth.routes";
import roomRoutes from "./routes/room.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Virtual Study Room API is running 🚀");
});

export default app;