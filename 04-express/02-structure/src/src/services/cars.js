// 비즈니스 로직(존재 확인, 권한 체크, 여러 모델들 조합)
//  +) DB 관련 로직 -> prisma 추가되면서 분리할게요!
// 요청(req)과 응답(res)을 모른다
import { pool } from "../db.js";

export const findCars = async () => {
  // 방법 2. 쿼리 하나로 해결
  const { rows } = await pool.query(`select c.id, c.plate, c.name, c.car_type, 				
                                        c.production_year, c.fuel, c.mileage,
                                        c.latest_service_date, 
                                        count(m.id) as service_count,
                                        (select item
                                        from maintenance_records
                                        where car_id = c.id
                                        order by service_date desc
                                        limit 1) as latest_service_item
                                    from cars c
                                    left join maintenance_records m on m.car_id = c.id
                                    group by c.id`);

  return rows;
};

export const findCarById = async (id) => {
  const { rows } = await pool.query(`select * from cars where id = $1`, [id]);
  // 어차피 결과 1개만 필요하니까
  return rows[0];
};

export const insertCar = async ({
  plate,
  name,
  car_type,
  production_year,
  fuel,
  mileage,
}) => {
  const { rows } = await pool.query(
    `insert into cars(plate, name, car_type, production_year, fuel, mileage) 
        values($1, $2, $3, $4, $5, $6) returning id, plate`,
    [plate, name, car_type, production_year, fuel, mileage],
  );
  return rows;
};

export const updateCarById = async (
  id,
  { plate, name, car_type, production_year, fuel, mileage },
) => {
  await pool.query(
    `update cars set plate = $1, name = $2, 
                     car_type=$3, production_year = $4, 
                     fuel=$5, mileage = $6
                 where id = $7`,
    [plate, name, car_type, production_year, fuel, mileage, id],
  );
};

export const deleteCarById = async (id) => {
  const { rowCount } = await pool.query(`delete from cars where id = $1`, [id]);
  return rowCount === 0;
};
