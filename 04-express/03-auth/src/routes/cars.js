// routes : 어떤 주소와 메서드로 요청이 오면
// 어느 controller 함수가 받을지 연결만 한다
import { Router } from "express";
import * as car from "../controllers/cars.js";

const router = Router();

// GET /api/cars
router.get("/", car.getCars);

// getCar
router.get("/:id", car.getCar);

// createCar
router.post("/", car.createCar);

// updateCar
router.put("/:id", car.updateCar);

// deleteCar
router.delete("/:id", car.deleteCar);

export default router;
