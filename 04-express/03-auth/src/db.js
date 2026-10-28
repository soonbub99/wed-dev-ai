import pg from "pg";
import "dotenv/config";

// export : 다른 파일에서 import로 가져다 쓸 수 있게 내보내기
export const pool = new pg.Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});
