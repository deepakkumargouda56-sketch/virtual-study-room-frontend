import pool from "../config/database";


export const createStudySession = async (
  userId: number,
  roomId: number,
  startTime: Date,
  endTime: Date,
  duration: number
) => {

  const query = `
    INSERT INTO study_sessions
    (user_id, room_id, start_time, end_time, duration)
    VALUES (?, ?, ?, ?, ?)
  `;


  const result = await pool.query(
    query,
    [
      userId,
      roomId,
      startTime,
      endTime,
      duration
    ]
  );


  return result;

};

  export const getRecentStudySessions = async (
 userId:number
)=>{

 const sessions = await pool.query(
 `
 SELECT *
 FROM study_sessions
 WHERE user_id = ?
 ORDER BY start_time DESC
 LIMIT 5
 `,
 [userId]
 );


 return sessions;

};