import { createPool } from 'mariadb';

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

export async function query(sql, params) {
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query(sql, params);
    } catch (err) {
        console.error("Database query error:", err.message);
        throw new Error(`Database query failed: ${err.message}`);
    } finally {
        if (conn) conn.release();
    }
}

export default query;
