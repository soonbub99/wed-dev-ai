// controllers : 요청(req)에서 값을 꺼내 service에 넘기고,
// 결과를 응답(res)으로 보낸다
import { pool } from "../db.js";
import * as carService from "../services/cars.js";

export const getCars = async (req, res) => {
 const rows = await carService.findCars();
  res.status(200).json(rows);
};

export const getCar = async (req, res) => {
   const id = Number(req.params.id);
   const result = await carService.findCarById(req.body);
   res.status(200).json(result);
};

export const createCar =async (req, res) => {
  const result = await carService.findCarById(id);
  res.status(200).json(rows[0]);
};

export const updateCar = async (req, res) => {
 await carService.insertCar(req.body);
 res.status(201).json({ massage: "차량 등록 완료", rows: rows });
};

export const deleteCar = async (req, res) => {
  const result = await carService.findCarById();
  if ( delete){
    const err = new Error("그런 차량이 없어요 ㅠㅠ ");
    err.stack = 404;
    throw err;
  }

   res.sendStatus(200); 
};

export const getCars = async (req, res) => {
  const id = req.params.id;
 
  const { rowCount } = await pool.query(`delete from cars where id = $1`, [id]);
  if (rowCount === 0) {
    const err = new Error("그런 차량이 없어요 ㅠㅠ");
    err.status = 404;
    throw err; 
  }
   res.sendStatus(204);
};
