import pool from "../config/database";

interface Room {
  name: string;
  description: string;
  created_by: number;
  max_members: number;
}

export const createRoom = async (room: Room) => {
  const { name, description, created_by, max_members } = room;

  const conn = await pool.getConnection();

  try {
    const result = await conn.query(
      `INSERT INTO rooms (name, description, created_by, max_members)
       VALUES (?, ?, ?, ?)`,
      [name, description, created_by, max_members]
    );

    return result;
  } finally {
    conn.release();
  }
};

export const getAllRooms = async () => {
  const conn = await pool.getConnection();

  try {
    const rows = await conn.query(`
      SELECT
        id,
        name,
        description,
        max_members,
        created_by,
        created_at
      FROM rooms
      WHERE is_active = TRUE
      ORDER BY created_at DESC
    `);

    return rows;
  } finally {
    conn.release();
  }
};


export const getMyRooms = async (userId: number) => {
  const conn = await pool.getConnection();

  try {
    const rows = await conn.query(
      `SELECT
        id,
        name,
        description,
        max_members,
        created_by,
        created_at
       FROM rooms
       WHERE created_by = ?
       AND is_active = TRUE
       ORDER BY created_at DESC`,
      [userId]
    );

    return rows;
  } finally {
    conn.release();
  }
};


export const getRoomById = async (id: number) => {
  const conn = await pool.getConnection();

  try {
    const rows = await conn.query(
      "SELECT * FROM rooms WHERE id = ?",
      [id]
    );

    return rows[0] || null;
  } finally {
    conn.release();
  }
};

export const joinRoom = async (roomId: number, userId: number) => {
  const conn = await pool.getConnection();

  try {
    const result = await conn.query(
      `INSERT INTO room_members (room_id, user_id)
       VALUES (?, ?)`,
      [roomId, userId]
    );

    return result;
  } finally {
    conn.release();
  }
};

export const isUserAlreadyJoined = async (
  roomId: number,
  userId: number
) => {
  const conn = await pool.getConnection();

  try {
    const rows = await conn.query(
      `SELECT * FROM room_members
       WHERE room_id = ? AND user_id = ?`,
      [roomId, userId]
    );

    return rows[0] || null;
  } finally {
    conn.release();
  }
};


export const leaveRoom = async (
  roomId: number,
  userId: number
) => {
  const conn = await pool.getConnection();

  try {
    const result = await conn.query(
      `UPDATE room_members
       SET
         left_at = CURRENT_TIMESTAMP,
         total_study_time = TIMESTAMPDIFF(
           MINUTE,
           joined_at,
           CURRENT_TIMESTAMP
         )
       WHERE room_id = ? AND user_id = ?`,
      [roomId, userId]
    );

    return result;
  } finally {
    conn.release();
  }
};


export const getRoomMembers = async (roomId: number) => {
  const conn = await pool.getConnection();

  try {
    const rows = await conn.query(
      `SELECT users.id, users.name, users.email
       FROM room_members
       JOIN users
       ON room_members.user_id = users.id
       WHERE room_members.room_id = ?`,
      [roomId]
    );

    return rows;
  } finally {
    conn.release();
  }
};

export const deleteRoom = async (roomId: number) => {
  const conn = await pool.getConnection();

  try {
    const result = await conn.query(
      `DELETE FROM rooms
       WHERE id = ?`,
      [roomId]
    );

    return result;
  } finally {
    conn.release();
  }
};

export const updateRoom = async (
  roomId: number,
  name: string,
  description: string,
  max_members: number
) => {
  const conn = await pool.getConnection();

  try {
    const result = await conn.query(
      `UPDATE rooms
       SET
         name = ?,
         description = ?,
         max_members = ?
       WHERE id = ?`,
      [name, description, max_members, roomId]
    );

    return result;
  } finally {
    conn.release();
  }
};



export const getJoinedRooms = async (userId: number) => {
  const conn = await pool.getConnection();

  try {
    const rows = await conn.query(
      `SELECT
        rooms.id,
        rooms.name, 36
        rooms.description,
        rooms.max_members,
        rooms.created_by,
        rooms.created_at,
        room_members.joined_at,
        room_members.total_study_time
      FROM room_members
      JOIN rooms
      ON room_members.room_id = rooms.id
      WHERE room_members.user_id = ?
      AND room_members.left_at IS NULL
      ORDER BY room_members.joined_at DESC`,
      [userId]
    );

    return rows;
  } finally {
    conn.release();
  }
};