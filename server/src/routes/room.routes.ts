import { Router } from "express";
import {
  createRoomController,
  getAllRoomsController,
  getRoomByIdController,
  joinRoomController,
  leaveRoomController,
  getRoomMembersController,
  deleteRoomController,
  updateRoomController,
  getMyRoomsController,
  getJoinedRoomsController,
} from "../controllers/room.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", authenticate, createRoomController);

router.get("/", authenticate, getAllRoomsController);

router.get("/my-rooms", authenticate, getMyRoomsController);

router.get(
  "/joined-rooms",
  authenticate,
  getJoinedRoomsController
);

router.get("/:id", authenticate, getRoomByIdController);

router.post("/:id/join", authenticate, joinRoomController);

router.post("/:id/leave", authenticate, leaveRoomController);

router.get("/:id/members", authenticate, getRoomMembersController);

router.delete("/:id", authenticate, deleteRoomController);

router.put("/:id", authenticate, updateRoomController);

export default router;