// controllers : 요청(req)에서 값을 꺼내 service에 넘기고,
// 결과를 응답(res)으로 보낸다
import * as carService from "../services/cars.js";

export const getCars = async (req, res) => {
  const rows = await carService.findCars();
  res.status(200).json(rows);
};

export const getCar = async (req, res) => {
  const id = Number(req.params.id);
  const result = await carService.findCarById(id);
  res.status(200).json(result);
};

export const createCar = async (req, res) => {
  const rows = await carService.insertCar(req.body);
  res.status(201).json({ message: "차량 등록 완료", rows: rows });
};

export const updateCar = async (req, res) => {
  await carService.updateCarById(req.params.id, req.body);
  res.sendStatus(200);
};

export const deleteCar = async (req, res) => {
  const result = await carService.deleteCarById(req.params.id);
  if (result) {
    const err = new Error("그런 차량이 없어요 ㅠㅠ");
    err.status = 404;
    throw err;
  }
  res.sendStatus(204);
};
