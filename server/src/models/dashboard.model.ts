import pool from "../config/database";

export const getDashboardStats = async (userId: number) => {
  const conn = await pool.getConnection();

  try {
    // Rooms Created
    const createdRooms = await conn.query(
      `SELECT COUNT(*) AS roomsCreated
       FROM rooms
       WHERE created_by = ?`,
      [userId]
    );

    // Rooms Joined
    const joinedRooms = await conn.query(
      `SELECT COUNT(*) AS roomsJoined
       FROM room_members
       WHERE user_id = ?`,
      [userId]
    );

    // Active Rooms
    const activeRooms = await conn.query(
      `SELECT COUNT(*) AS activeRooms
       FROM room_members
       WHERE user_id = ?
       AND left_at IS NULL`,
      [userId]
    );

    // Total Study Time
    const studyTime = await conn.query(
      `SELECT SUM(total_study_time) AS totalStudyTime
       FROM room_members
       WHERE user_id = ?`,
      [userId]
    );

    return {
  roomsCreated: Number(createdRooms[0].roomsCreated),
  roomsJoined: Number(joinedRooms[0].roomsJoined),
  activeRooms: Number(activeRooms[0].activeRooms),
  totalStudyTime: Number(studyTime[0].totalStudyTime || 0),
};
  } finally {
    conn.release();
  }
};


export const getCreatedRooms = async (userId:number) => {

  const rooms = await pool.query(
    `
    SELECT *
    FROM rooms
    WHERE created_by = ?
    `,
    [userId]
  );

  return rooms;
};


  export const getJoinedRooms = async (userId:number) => {

  const rooms = await pool.query(
    `
    SELECT rooms.*
    FROM rooms
    JOIN room_members
    ON rooms.id = room_members.room_id
    WHERE room_members.user_id = ?
    `,
    [userId]
  );

  return rooms;

};