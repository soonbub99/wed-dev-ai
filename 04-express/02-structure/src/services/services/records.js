import { pool } from "../db.js";

export const findRecords = async (plate) => {
  const { rows } = await pool.query(
    `select plate, name, service_date, item, memo, cost
                from maintenance_records m 
                join cars c on c.id = m.car_id 
                where plate = coalesce($1, plate)`,
    [plate],
  );
  return rows;
};

export const findRecordById = async (id) => {
  const { rows } = await pool.query(
    `select * from maintenance_records where id = $1`,
    [id],
  );
  return rows[0];
};
