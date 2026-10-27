// 비즈니스 로직(존재 확인, 권한 체크, 여러 모델들 조합)
// +) DB 관련 로직 -> prisma 추가되면서 분리할게요!
// 요청(req)과 응답(res)을 모른다
import { pool } from "../db.js";

export const findCars = async () => {
  const { rows: cars } = await pool.query(`select * from cars`);
  const { rows: counts } =
    await pool.query(`select car_id, count(*) as service_count
                    from maintenance_records
                    group by car_id`);
  const rows = cars.map((car) => {
     const found = counts.find((c) => c.car_id === car.id);
    return {
      ...car,
      service_count: found ? found.service_count : 0,
    };
  });
  return rows;
};

export const findCarById = async (id) => {
    const { rows } = await pool.query('select * from cars where id = $1',[id]);
    //어차피 결과 1개만 필요하니까
    return rows[0];
};

export const insertCar = async () => {
    const { rows } = await pool.query(
        `insert into cars(plate,name,car_type,production_year,fuel,mileage)
         values($1, $2, $3, $4, $5, $6) returning id, plate`,
    [plate, name, car_type, production_year, fuel, mileage],
  );
};

export const updateCarBuId = async () => {
    await pool.query(
    
    )
    }

export const deleteCarById = async (id) => {
     const { rowCount } = req.body;
  await pool.query(
    `update cars 
    set plate = $1, name = $2,
                  car_type=$3, production_year = $4,
                  fuel = $5, mileage = $6
    where id = $7`,
    [plate, name, car_type, production_year, fuel, mileage, id],
  );
  return rowCount === 0;
  };