import pool from "./database";

const testConnection = async () => {
  try {
    const conn = await pool.getConnection();

    console.log("✅ Database Connected Successfully!");

    conn.release();
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
  }
};

export default testConnection;