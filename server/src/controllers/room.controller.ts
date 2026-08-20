import { Request, Response } from "express";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  getMyRooms,
  joinRoom,
  isUserAlreadyJoined,
  leaveRoom,
  getRoomMembers,
  deleteRoom,
  updateRoom,
  getJoinedRooms,
} from "../models/room.model";
export const createRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, description, max_members } = req.body;

    // Get logged-in user's ID from JWT
    const created_by = (req as any).user.id;

    // Validation
    if (!name || !description || !max_members) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Save room
    await createRoom({
      name,
      description,
      created_by,
      max_members,
    });

    return res.status(201).json({
      message: "Room created successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllRoomsController = async (
  req: Request,
  res: Response
) => {
  try {
    const rooms = await getAllRooms();

    return res.status(200).json({
      message: "Rooms fetched successfully",
      rooms,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const getRoomByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const room = await getRoomById(id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    return res.status(200).json({
      message: "Room fetched successfully",
      room,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const getMyRoomsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const rooms = await getMyRooms(userId);

    return res.status(200).json({
      message: "My rooms fetched successfully",
      rooms,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const joinRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const roomId = Number(req.params.id);
    const userId = (req as any).user.id;

    // Check if room exists
    const room = await getRoomById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Check if user already joined
    const alreadyJoined = await isUserAlreadyJoined(roomId, userId);

    if (alreadyJoined) {
      return res.status(409).json({
        message: "You have already joined this room",
      });
    }

    // Join room
    await joinRoom(roomId, userId);

    return res.status(200).json({
      message: "Joined room successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const leaveRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const roomId = Number(req.params.id);
    const userId = (req as any).user.id;

    const room = await getRoomById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    await leaveRoom(roomId, userId);

    return res.status(200).json({
      message: "Left room successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getRoomMembersController = async (
  req: Request,
  res: Response
) => {
  try {
    const roomId = Number(req.params.id);

    const room = await getRoomById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const members = await getRoomMembers(roomId);

    return res.status(200).json({
      message: "Members fetched successfully",
      members,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const roomId = Number(req.params.id);
    const userId = (req as any).user.id;

    // Check if room exists
    const room = await getRoomById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Check ownership
    if (room.created_by !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this room",
      });
    }

    // Delete room
    await deleteRoom(roomId);

    return res.status(200).json({
      message: "Room deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const updateRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const roomId = Number(req.params.id);
    const userId = (req as any).user.id;

    const { name, description, max_members } = req.body;

    // Check if room exists
    const room = await getRoomById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Check ownership
    if (room.created_by !== userId) {
      return res.status(403).json({
        message: "You are not authorized to update this room",
      });
    }

    await updateRoom(
      roomId,
      name,
      description,
      max_members
    );

    return res.status(200).json({
      message: "Room updated successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


export const getJoinedRoomsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const rooms = await getJoinedRooms(userId);

    return res.status(200).json({
      message: "Joined rooms fetched successfully",
      rooms,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};